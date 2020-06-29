import React from 'react';
import { View, StyleSheet } from 'react-native';
import CartHome from '../components/cart/CartHome'

const CartsScreen = () => {
    return (
        <View style={styles.screen}>
            <CartHome />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default CartsScreen