import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';
import TitleText from '../TitleText';
import CartItemList from './CartItemList';
import updateCartToDB from '../../apiCalls/updateCart';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, deleteCustomerCart } from '../../store/actions/cart';
import newOrder from '../../apiCalls/newOrder';
import { addOrder } from '../../store/actions/orders';
import deleteCart from '../../apiCalls/deleteCart';

const CartItem = ({ cart }) => {
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [date, setDate] = useState('')
    const [startTime, setStart] = useState('')
    const [endTime, setEnd] = useState('')

    const token = useSelector(state => state.user.user.token)
    const dispatch = useDispatch()

    const changeTotal = () => {
        let total = 0
        cart.items.map(item => {
            total = total + item.quantity * item.sellingPrice
        })
        if (total >= 0)
            setTotalCost(total)
    }

    const onOrder = async () => {
        if (!date || !startTime || !endTime) {
            return setDateModalVisible(true)
        }
        setDateModalVisible(false)
        const body = await JSON.stringify({
            merchantId: cart.merchantId,
            customerId: cart.customerId,
            shopName: cart.shopName,
            customerName: cart.customerName,
            items: cart.items,
            totalCost,
            pickUpTime: {
                date,
                start: startTime,
                end: endTime
            }
        })
        const order = await newOrder(body, token)
        const deletedCart = await deleteCart(JSON.stringify({
            _id: cart._id
        }), token)
        dispatch(addOrder(order))
        dispatch(deleteCustomerCart(deletedCart))
    }

    useEffect(() => {
        setCartModalVisible(false)
    }, [cart])

    const saveCart = async () => {
        const body = await JSON.stringify({
            _id: cart._id,
            items: cart.items,
            totalCost
        })
        const updatedCart = await updateCartToDB(body, token)
        dispatch(updateCart(updatedCart))
        setCartModalVisible(false)
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{cart.shopName}</Text>
                        <Text style={styles.text} >Total: ₹{totalCost}</Text>
                    </View>
                    <MainButton style={{ width: 90 }} textStyle={{ fontSize: 14 }} onPress={() => setCartModalVisible(true)} >Check</MainButton>
                </View>
            </Card>
            <Modal
                animationType="slide"
                visible={cartModalVisible}
                onRequestClose={() => {
                    setCartModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setCartModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{cart.shopName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={{ fontFamily: 'open-sans-bold', fontSize: 22 }}>Items</Text>
                    <FlatList
                        data={cart.items}
                        renderItem={({ item }) => {
                            return (
                                <CartItemList item={item} changeTotal={changeTotal} />
                            )
                        }}
                        keyExtractor={item => item.itemId}
                    />
                    <View style={{ marginTop: 20, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 40 }} >Total: ₹{totalCost}</Text>
                        <MainButton
                            style={{ marginTop: 5, backgroundColor: colors.secondary }}
                            onPress={saveCart}
                        >
                            Save Cart
                        </MainButton>
                        <MainButton style={{ marginTop: 5 }} onPress={onOrder}>Order</MainButton>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={dateModalVisible}
                onRequestClose={() => {
                    setDateModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setCartModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>Set Pickup</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName}>Date</Text>
                    <TextInput
                        style={inputStyles.input}
                        placeholder='Date: dd/mm'
                        onChangeText={setDate}
                    />
                    <Text style={styles.itemName}>Pick up between: </Text>
                    <TextInput
                        style={inputStyles.input}
                        placeholder='Start time: hh:mm AM/PM'
                        onChangeText={setStart}
                    />
                    <TextInput
                        style={inputStyles.input}
                        placeholder='End time: hh:mm AM/PM'
                        onChangeText={setEnd}
                    />
                    <MainButton style={{ marginTop: 5 }} onPress={onOrder}>Order</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    },
    modalHeader: {
        alignItems: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default CartItem