import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Image, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AppLoading } from 'expo';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import MainButton from '../MainButton';
import inputStyle from '../../styles/input'
import Header from '../Header';
import GoodsProviderList from './GoodsProviderList';
import typeSelector from '../selectors/typeSelector';
import { ScrollView } from 'react-native-gesture-handler';

const GoodsProviderHome = () => {
    const merchants = useSelector(state => state.merchants)
    const [goodsProviders, setGoodsProvider] = useState([{
        type: 'grocery',
        merchants: merchants.goodsProviders
    }, {
        type: 'medical',
        merchants: typeSelector(merchants.goodsProviders, 'medical')
    }])

    return (
        <View style={styles.screen} >
            <View style={{...styles.header2, marginTop: 8}}>
                <TitleText style={{fontSize: 15}} >GOODS PROVIDERS</TitleText>
            </View>
            <FlatList
                data={goodsProviders}
                renderItem={({ item }) => {
                    return (
                        <GoodsProviderList category={item} />
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
        backgroundColor: colors.primary
    },
})

export default GoodsProviderHome