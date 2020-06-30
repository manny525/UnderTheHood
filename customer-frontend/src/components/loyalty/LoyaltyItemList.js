import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input';

const LoyaltyItemList = ({ item }) => {

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <Text style={styles.itemName} >{item.merchantId}</Text>
                <Text style={styles.itemName} >₹{item.points}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * 0.8
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default LoyaltyItemList