import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';
import Header from '../Header';
import PendingOrders from '../order/PendingOrders';
import AsyncStorage from '@react-native-community/async-storage';

const HomePage = ({ navigation }) => {
    const userData = useSelector(state => state.user.user)
    const token = userData.token
    const user = userData.user

    const onLogout = () => {
        AsyncStorage.clear()
    }

    return (
        <View>
            <Header title='HOME' />
            <View style={styles.container} >
                <Text>Welcome {user.merchantName}</Text>
                <MainButton onPress={onLogout} >Logout</MainButton>
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