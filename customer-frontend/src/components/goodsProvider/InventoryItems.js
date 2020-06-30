import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import InventoryItem from './InventoryItem';

const InventoryItems = ({ items }) => {
    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <InventoryItem item={item} />
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
        width: '100%',
        alignItems: 'stretch'
    }
})

export default InventoryItems