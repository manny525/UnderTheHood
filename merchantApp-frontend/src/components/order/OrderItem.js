import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import OrderItemList from './OrderItemList';
import inputStyle from '../../styles/input';
import { updateOrders } from '../../store/actions/orders';
import updateOrderStatus from '../../apiCalls/updateOrderStatus';
import getPaid from '../../apiCalls/getPaid';

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [vCode, setVcode] = useState('')
    const [received, setReceived] = useState(false)

    const token = useSelector(state => state.user.user.token)

    const dispatch = useDispatch()

    const orderStatusChange = async () => {
        let status
        if (order.status === 'pending') {
            status = 'ready'
        }
        else if (order.status === 'completed') {
            console.log('pay me')
            status = 'paymentdone'
            const body = await JSON.stringify({ otp: vCode })
            const paymentInfo = getPaid(body, token)
            console.log(paymentInfo)
            if (paymentInfo.success) {
                setReceived(true)
            } else {
                return
            }
        }
        const body = JSON.stringify({
            _id: order._id,
            status
        })
        console.log(token)
        const updatedOrder = await updateOrderStatus(body, token)
        console.log(updatedOrder)
        dispatch(updateOrders(updatedOrder))
        setOrderModalVisible(false)
        if (status === 'ready') {
            setTab(2)
        }
        else if (status === 'paymentdone') {
            setTab(4)
        }
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.customerName}</Text>
                        <Text style={styles.text} >{order.pickUpTime.date}</Text>
                        <Text style={styles.text} >{order.pickUpTime.start} - {order.pickUpTime.end}</Text>
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setOrderModalVisible(true)} >Check</MainButton>
                </View>
            </Card>
            <Modal
                animationType="slide"
                visible={orderModalVisible}
                onRequestClose={() => {
                    setOrderModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setOrderModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>Customer: {order.customerName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={{ fontFamily: 'open-sans-bold', fontSize: 22 }}>Items</Text>
                    <FlatList
                        data={order.items}
                        renderItem={({ item }) => {
                            return (
                                <OrderItemList item={item} orderType={order.status} />
                            )
                        }}
                        keyExtractor={item => item.itemId}
                    />
                    <View style={{ marginTop: 20, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 40 }} >Total: ₹{order.totalCost}</Text>
                        {order.status === 'completed' &&
                            <TextInput
                                style={inputStyle.input}
                                placeholder="Verification Code"
                                onChangeText={setVcode}
                                maxLength={6}
                            />}
                        {order.status !== 'ready' && <MainButton onPress={orderStatusChange} style={{ marginTop: 5 }}>
                            {order.status === 'pending' ? 'Ready' : 'Get Paid'}</MainButton>}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
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

export default OrderItem