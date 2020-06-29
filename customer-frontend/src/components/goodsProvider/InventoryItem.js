import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../store/actions/cartItems';

const InventoryItem = ({ item }) => {
    const [error, setError] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [inCart, setInCart] = useState(false)

    const dispatch = useDispatch()

    const onAddCart = () => {
        dispatch(addItem({
            itemId: item.itemId,
            itemName: item.itemName,
            sellingPrice: item.sellingPrice,
            quantity: 0
        }))
        setInCart(true)
    }

    return (
        <View style={{ flex: 1 }} >
            {item.available && <View style={styles.itemContainer} >
                <Text style={styles.itemName} >{item.itemName}</Text>
                <Text style={styles.itemName} >₹{item.sellingPrice}</Text>
                <View style={{ alignItems: "center" }} >
                    {!inCart ? <TouchableOpacity activeOpacity={0.6} onPress={onAddCart} >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Add</Text>
                        </View>
                    </TouchableOpacity> : <Text style={styles.itemName} >Added</Text>}
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 22
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 25,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 15
    }
})

export default InventoryItem