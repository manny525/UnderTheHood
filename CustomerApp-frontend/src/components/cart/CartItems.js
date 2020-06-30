import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from './CartItem'

const CartItems = () => {
    const carts = useSelector(state => state.cart.carts)
    // console.log(carts)
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
    }
})

export default CartItems