import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';

const HomePage = ({ navigation }) => {
    const userData = useSelector(state => state.user.user)
    const token = userData.token
    const user = userData.user
    return (
        <View style={styles.container} >
            <Text>Welcome {user.merchantName}</Text>
            <MainButton onPress={() => navigation.navigate('Inventory')}>Inventory</MainButton>
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