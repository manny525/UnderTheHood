import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import MyCard from '../components/card/MyCard';
const CardsScreen = () => {
    return (
        <View style={styles.screen}>
            <MyCard />
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