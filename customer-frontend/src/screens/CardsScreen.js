import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
const CardsScreen = () => {
    return (
        <View style={styles.screen}>
            <Header title="MY CARDS" />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default CardsScreen