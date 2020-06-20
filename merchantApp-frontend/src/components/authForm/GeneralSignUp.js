import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';

const GeneralSignUp = (props) => {
    const [merchantName, setMerchantName] = useState('')
    const [aadhar, setAadhar] = useState('')
    const [merchantType, setMerchantType] = useState('')
    const [referral, setReferral] = useState('')
    const [imgSrc, setImgSrc] = useState(null)
    const [error, setError] = useState('')

    const onNext = () => {
        if (merchantName && aadhar && merchantType) {
            props.onNext({
                merchantName,
                aadhar,
                merchantType
            })
        }
        else {
            setError('*Please enter all the details')
        }
    }

    const verifyAadhar = async (text) => {
        if (text.length === 0) {
            setImgSrc(null)
            setAadhar('')
        }
        else if (text.length != 12) {
            setImgSrc(require('../../../assets/redcross.png'))
            setAadhar('')
        }
        else if (text.length === 12) {
            //render loading symbol
            //use aadhar validation
            setAadhar(text)
            setImgSrc(require('../../../assets/greentick.png'))
        }
    }

    return (
        <View style={styles.formContainer}>
            {!!error && <Text>{error}</Text>}
            <TextInput
                style={inputStyle.input}
                placeholder='Merchant Name'
                onChangeText={(text) => { setMerchantName(text) }}
                value={merchantName}
            />
            <View style={styles.panContiner}>
                <TextInput
                    style={inputStyle.input}
                    placeholder='Aadhar Card Number'
                    keyboardType='number-pad'
                    onChangeText={verifyAadhar}
                    maxLength={12}
                />
                {imgSrc ? <Image style={styles.tinyLogo} source={imgSrc} /> : <></>}
            </View>
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
        width: Dimensions.get('window').width * 0.5,
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
    },
    panContiner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tinyLogo: {
        marginLeft: 10,
        height: 20,
        width: 20
    }
})

export default GeneralSignUp