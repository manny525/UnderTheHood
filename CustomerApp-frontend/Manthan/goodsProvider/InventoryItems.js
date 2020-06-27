import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Modal, Dimensions, Image, TextInput } from 'react-native';
import InventoryItem from './InventoryItem';
import TitleText from '../TitleText';
import colors from '../../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import addItemInventory from '../../apiCalls/addItemInventory';
import { setInventory } from '../../store/actions/inventory';

const InventoryItems = ({ items, category }) => {
    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <InventoryItem item={item} categoryId={category._id} />
                    )
                }}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        marginTop: 5,
        flex: 1,
        width: '80%',
        marginLeft: 30,
        alignItems: 'stretch'
    },
    addItem: {
        marginTop: 10,
        width: '50%',
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    },
    modalHeader: {
        alignItems: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryItems