import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';

const CartItemList = ({ item }) => {
    const [available, setAvailable] = useState(true)
    const [quantity, setQuantity] = useState(item.quantity.toString())

    const checkQuantity = (text) => {
        if (parseInt(text) <= item.quantity && parseInt(text) > 0 || text==='') {
            setQuantity(text)
        }
    }

    return (
        <View>
            <Text style={styles.itemName} >{item.itemName}</Text>
            <View style={styles.itemContainer}>
                <TextInput 
                    keyboardType="number-pad" 
                    style={{...inputStyles.input, width: 35}} 
                    onChangeText={checkQuantity} 
                    value={quantity.toString()} 
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
        fontSize: 20
    }
})

export default CartItemList