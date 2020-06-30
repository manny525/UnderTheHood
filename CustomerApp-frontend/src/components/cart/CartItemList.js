import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';

const CartItemList = ({ item, changeTotal }) => {
    const [quantity, setQuantity] = useState(item.quantity.toString())

    const changeQuantity = (text) => {
        setQuantity(text)
        if (parseInt(text) > 0)
            item.quantity = parseInt(text)
        else
            item.quantity = 0
        changeTotal()
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.itemName} >{item.itemName}</Text>
                <Text style={styles.itemName} >₹{item.sellingPrice}</Text>
            </View>
            <View style={styles.itemContainer}>
                <TextInput
                    keyboardType="number-pad"
                    style={{ ...inputStyles.input, width: 35 }}
                    onChangeText={changeQuantity}
                    value={quantity}
                />
            </View>
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
        fontSize: 16
    }
})

export default CartItemList