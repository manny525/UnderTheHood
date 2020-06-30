import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LoyaltyItem from './LoyaltyItem'

const LoyaltyItems = () => {
    const points = useSelector(state => state.loyalty.points)
    console.log(points)
    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={points}
                renderItem={({ item }) => {
                    return (
                        <LoyaltyItem li={item} />
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
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    }
})

export default LoyaltyItems