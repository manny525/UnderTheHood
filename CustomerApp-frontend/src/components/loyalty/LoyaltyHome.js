import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../../../customer-frontend/src/constants/colors';
import Header from '../../../../customer-frontend/src/components/Header';
import LoyaltyItems from './LoyaltyItems';

const LoyaltyHome = () => {
    return (
        <View style={styles.screen} >
            <Header title='MY LOYALTY POINTS' />
            <LoyaltyItems />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
})

export default LoyaltyHome