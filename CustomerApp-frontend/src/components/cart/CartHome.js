import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../Header';
import CartItems from './CartItems';

const CartHome = () => {
    return (
        <View style={styles.screen} >
            {/* <Header title='MY CARTS' /> */}
            <CartItems />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default CartHome