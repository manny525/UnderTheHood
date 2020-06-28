import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Image, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import MainButton from '../MainButton';
import inputStyle from '../../styles/input'
import Header from '../Header';
import ServiceProviderList from './ServiceProviderList';
import typeSelector from '../selectors/typeSelector';

const ServiceProviderHome = () => {
    const merchants = useSelector(state => state.merchants)
    const [serviceProviders, setServiceProvider] = useState([{
        type: 'barber',
        merchants: typeSelector(merchants.serviceProviders, 'barber')
    }, {
        type: 'electrician',
        merchants: typeSelector(merchants.serviceProviders, 'electrician')
    }])

    return (
        <View style={styles.screen} >
            <Header title='GOODS PROVIDERS' />
            <FlatList
                data={serviceProviders}
                renderItem={({ item }) => {
                    return (
                        <ServiceProviderList category={item} />
                    )
                }}
                keyExtractor={item => item.type}
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

export default ServiceProviderHome