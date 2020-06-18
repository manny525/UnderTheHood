import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker } from 'react-native';
import inputStyle from '../styles/input';
import MainButton from './MainButton'
import colors from '../constants/colors';

const GeneralSignUp = (props) => {
    const [merchantName, setMerchantName] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [shopName, setShopName] = useState('')
    const [merchantType, setMerchantType] = useState('')
    const [referral, setReferral] = useState('')

    const onNext = () => {
        if (merchantName && aadhar && shopName && merchantType) {
            props.onNext({
                merchantName,
                aadhar,
                shopName,
                merchantType
            })
        }
    }

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={inputStyle.input}
                placeholder='Merchant Name'
                onChangeText={(text) => { setMerchantName(text) }}
                value={merchantName}
            />
            <TextInput
                style={inputStyle.input}
                placeholder='Aadhar Card Number'
                keyboardType='number-pad'
                onChangeText={(text) => { setAadhar(text) }}
                value={aadhar}
            />
            <TextInput
                style={inputStyle.input}
                placeholder='Shop Name'
                onChangeText={(text) => { setShopName(text) }}
                value={shopName}
            />
            <Text>Merchant Type</Text>
            <Picker
                style={styles.onePicker} itemStyle={styles.onePickerItem}
                mode='dropdown'
                selectedValue={merchantType}
                onValueChange={(itemValue, itemIndex) => setMerchantType(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Goods Provider" value="goods" />
                <Picker.Item label="Service Provider" value="service" />
            </Picker>
            <TextInput
                style={inputStyle.input}
                placeholder='Customer Referral: Optional'
                onChangeText={(text) => { setReferral(text) }}
                value={referral}
            />
            <MainButton onPress={onNext} >Next</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    dropdown: {
        paddingHorizontal: Dimensions.get('window').width / 4
    },
    picker: {
    },
    onePicker: {
        height: 30,
        width: Dimensions.get('window').width * 0.6,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: colors.opaque
    },
    onePickerItem: {
        height: 44,
        color: 'red'
    },
    typeContainer: {
        flexDirection: 'row'
    }
})

export default GeneralSignUp