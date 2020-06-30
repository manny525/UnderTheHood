import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import InventoryList from './InventoryList';

const InventoryHome = ({ inventory }) => {
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