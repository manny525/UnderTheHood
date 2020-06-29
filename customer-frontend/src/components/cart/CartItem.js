import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import CartItemList from './CartItemList';

const CartItem = ({ cart }) => {
    const [cartModalVisible, setCartModalVisible] = useState(false)
    const [totalCost, setTotalCost] = useState(0)

    const changeTotal = () => {
        let total = 0
        cart.items.map(item => {
            total = total + item.quantity*item.sellingPrice
        })
        if (total >= 0)
            setTotalCost(total)
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{cart.shopName}</Text>
                        <Text style={styles.text} >Total: ₹{totalCost}</Text>
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setCartModalVisible(true)} >Check</MainButton>
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
                    <Text style={{fontFamily: 'open-sans-bold', fontSize: 22}}>Items</Text>
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
                        <MainButton style={{ marginTop: 5 }}>Order</MainButton>
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