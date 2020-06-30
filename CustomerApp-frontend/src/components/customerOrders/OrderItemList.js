import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';

const OrderItemList = ({ item, orderType }) => {
    const [available, setAvailable] = useState(true)
    const [quantity, setQuantity] = useState(item.quantity.toString())

    const checkQuantity = (text) => {
        if (parseInt(text) <= item.quantity && parseInt(text) > 0 || text === '') {
            setQuantity(text)
        }
    }

    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemName} >{item.itemName}</Text>
            <Text style={styles.itemName} >{quantity}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default OrderItemList