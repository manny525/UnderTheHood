import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderHome from '../components/serviceRequests/OrderHome';

const RequestsScreen = () => {
    return (
        <View style={styles.screen}>
            <OrderHome />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default RequestsScreen