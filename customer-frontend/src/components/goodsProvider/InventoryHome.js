import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Image, Modal } from 'react-native';
import colors from '../../constants/colors';
import InventoryList from './InventoryList';
import { useSelector, useDispatch } from 'react-redux';

const InventoryHome = ({ inventory }) => {
    const dispatch = useDispatch()
    return (
        <View style={styles.screen} >
            <FlatList
                data={inventory.categories}
                renderItem={({ item }) => {
                    return (
                        <InventoryList category={item} />
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default InventoryHome