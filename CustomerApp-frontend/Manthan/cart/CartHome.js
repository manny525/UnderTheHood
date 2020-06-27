import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import Header from '../Header';
import CartItems from './CartItems';

const CartHome = () => {
    const [tab, setTab] = useState(1)

    return (
        <View style={styles.screen} >
            <Header title='MY CARTS' />
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