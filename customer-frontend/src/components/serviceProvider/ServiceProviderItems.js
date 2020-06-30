import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import ServiceProviderItem from './ServiceProviderItem';

const ServiceProviderItems = ({ items }) => {
    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <ServiceProviderItem item={item} />
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
    }
})

export default ServiceProviderItems