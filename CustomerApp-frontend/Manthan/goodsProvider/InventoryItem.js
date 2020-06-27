import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import deleteItemInventory from '../../apiCalls/deleteItemInventory';
import { useSelector, useDispatch } from 'react-redux';
import { setInventory } from '../../store/actions/inventory';
import editItemInventory from '../../apiCalls/editItemInventory';
import addItemInventory from '../../apiCalls/addItemInventory';

const InventoryItem = ({ item }) => {
    const [error, setError] = useState('')

    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)

    const dispatch = useDispatch()

    return (
        <View style={styles.itemContainer} >
            <Text style={styles.itemName} >{item.itemName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryItem