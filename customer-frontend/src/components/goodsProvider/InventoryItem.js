import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import { useSelector, useDispatch } from 'react-redux';

const InventoryItem = ({ item }) => {
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(0)

    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    return (
        <View style={styles.itemContainer} >
            <Text style={styles.itemName} >{item.itemName}</Text>
            <Text style={styles.itemName} >₹{item.sellingPrice}</Text>
            <View style={{ flexDirection: 'row' }} >
                <TouchableOpacity onPress={() => {
                    if (quantity > 0) {
                        setQuantity(quantity - 1)
                    }
                }}
                >
                    <Text style={styles.itemName} >-  </Text>
                </TouchableOpacity>
                <Text style={styles.itemName} >{quantity}</Text>
                <TouchableOpacity onPress={() => {
                    setQuantity(quantity + 1)
                }}
                >
                    <Text style={styles.itemName} >  +</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 25
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryItem