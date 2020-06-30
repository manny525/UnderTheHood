import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import Header from '../Header';
import LoyaltyItems from './LoyaltyItems';

const LoyaltyHome = () => {
    const [tab, setTab] = useState(1)

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