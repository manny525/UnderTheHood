import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import ServiceProviderList from './ServiceProviderList';
import typeSelector from '../selectors/typeSelector';

const ServiceProviderHome = () => {
    const merchants = useSelector(state => state.merchants)
    const [serviceProviders, setServiceProvider] = useState([{
        type: 'barber',
        merchants: merchants.serviceProviders
    }, {
        type: 'electrician',
        merchants: typeSelector(merchants.serviceProviders, 'electrician')
    }])

    return (
        <View style={styles.screen} >
            <View style={{...styles.header2, marginTop: 8}}>
                <TitleText style={{fontSize: 15}} >SERVICE PROVIDERS</TitleText>
            </View>
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
    },
    header2: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    }
})

export default ServiceProviderHome