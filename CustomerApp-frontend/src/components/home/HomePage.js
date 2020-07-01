import React from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';
import Header from '../Header';
import GoodsProviderHome from '../goodsProvider/GoodsProviderHome'
import ServiceProviderHome from '../serviceProvider/ServiceProviderHome';

const HomePage = () => {
    return (
        <View style={styles.container} >
            {/* <Header title='MERCHANTS' /> */}
            <GoodsProviderHome />
            <ServiceProviderHome />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default HomePage