import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from './OrderItem'
import orderTypeSelector from '../selectors/orderTypeSelector';

const CompletedOrders = () => {
    const token = useSelector(state => state.user.user.token)
    const owner = useSelector(state => state.user.user.user._id)
    const orders = useSelector(state => state.serviceRequest.requests)

    const [completedOrders] = useState(orderTypeSelector(orders, 'completed'))

    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={completedOrders}
                renderItem={({ item }) => {
                    return (
                        <OrderItem order={item} />
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
        width: '80%'
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

export default CompletedOrders