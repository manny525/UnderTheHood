import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Button, Image } from 'react-native';
import colors from '../../constants/colors';
import InventoryList from './InventoryList';

const sample = [{
    id: 'Biscuits',
    category: 'Biscuits',
    list: [{
        id: 'Goodday',
        item: 'Goodday',
        available: true,
        sellingPrice: '30'
    }, {
        id: 'Hide and Seek',
        item: 'Hide and Seek',
        available: true,
        sellingPrice: '30'
    }, {
        id: 'Britannia',
        item: 'Britannia',
        available: true,
        sellingPrice: '30'
    }]
}, {
    id: 'Drinks',
    category: 'Drinks',
    list: [{
        id: 'Pepsi',
        item: 'Pepsi',
        available: true,
        sellingPrice: '30'
    }, {
        id: 'Coca Cola',
        item: 'Coca Cola',
        available: true,
        sellingPrice: '30'
    }, {
        id: 'Maaza',
        item: 'Maaza',
        available: true,
        sellingPrice: '30'
    }]
}]

const InventoryHome = () => {
    return (
        <View style={styles.screen}>
            <FlatList
                data={sample}
                renderItem={({ item }) => {
                    return (
                        <InventoryList item={item} />
                    )
                }}
                keyExtractor={item => item.id}
            />
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
    }
})

export default InventoryHome