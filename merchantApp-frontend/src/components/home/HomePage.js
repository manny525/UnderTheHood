import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';
import Header from '../Header';
import PendingOrders from '../order/PendingOrders';

const HomePage = ({ navigation }) => {
    const userData = useSelector(state => state.user.user)
    const token = userData.token
    const user = userData.user
    return (
        <View>
            <Header title='HOME' />
            <View style={styles.container} >
                <Text>Welcome {user.merchantName}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HomePage