import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem'

const CartItems = () => {
    const carts = useSelector(state => state.cart.carts)

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={carts}
                renderItem={({ item }) => {
                    return (
                        <CartItem cart={item} />
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        flex: 1,
        alignSelf: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default CartItems