import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Image, Modal } from 'react-native';
import colors from '../../constants/colors';
import InventoryList from './InventoryList';
import { useSelector, useDispatch } from 'react-redux';

const InventoryHome = ({ inventory }) => {
    const dispatch = useDispatch()

    return (
        <View style={styles.screen} >
            {inventory &&
                <FlatList
                    data={inventory.categories}
                    renderItem={({ item }) => {
                        return (
                            <InventoryList category={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.opaque,
        marginVertical: 2,
        width: Dimensions.get('window').width * 0.8
    },
    category: {
        fontSize: 30
    },
    tinyLogo: {
        marginTop: 5,
        marginRight: 5,
        height: 15,
        width: 15
    },
    addItem: {
        width: '50%',
        marginLeft: 100,
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
    tinyLogoArrow: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default InventoryHome