import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/actions/cartItems';

const InventoryItem = ({ item }) => {
    const [inCart, setInCart] = useState(false)

    const dispatch = useDispatch()

    const onAddCart = () => {
        dispatch(addItem({
            itemId: item._id,
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
        fontSize: 16
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 25,
        alignItems: 'center',
        marginRight: 5
    },
    buttonText: {
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 14
    }
})

export default InventoryItem