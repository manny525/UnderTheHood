import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoyaltyHome from '../components/loyalty/LoyaltyHome';

const LoyaltyScreen = () => {
    return (
        <View style={styles.screen}>
            <LoyaltyHome />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default LoyaltyScreen;