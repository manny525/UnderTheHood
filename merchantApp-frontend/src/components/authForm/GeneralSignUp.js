import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import createAlias from '../../apiCalls/createAlias';

const GeneralSignUp = (props) => {
    const [merchantName, setMerchantName] = useState('')
    const [merchantType, setMerchantType] = useState('')
    const [merchantPAN, setMerchantPAN] = useState('')
    const [referral, setReferral] = useState('')
    const [imgSrc, setImgSrc] = useState(null)
    const [error, setError] = useState('')
    const [cardValidated, setCardValidated] = useState(false)

    const onNext = () => {
        if (merchantName && merchantType && merchantPAN && cardValidated) {
            props.onNext({
                merchantName,
                merchantType
            })
        }
        else {
            setError('*Please enter all the details')
        }
    }

    const verifyPAN = async () => {
        
        if (text.length != 16) {
            setError('*Invalid Card Data')
        }
        else if (text.length === 16) {
            setError('')
            const body = await JSON.stringify({
                merchantName,
                recipientPrimaryAccountNumber: merchantPAN,
                cardType: 'Visa Classic',
                issuerName: 'Test Bank 1',
                email
            })
            await createAlias(body)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.formContainer}>
                {!!error && <Text>{error}</Text>}
                <TextInput
                    style={inputStyle.input}
                    placeholder='Name on Card'
                    onChangeText={setMerchantName}
                    value={merchantName}
                    editable={!cardValidated}
                />
                <Text>To Accept Payments</Text>
                <TextInput
                    style={inputStyle.input}
                    placeholder='Card Number'
                    onChangeText={setMerchantPAN}
                    editable={!cardValidated}
                />
                <MainButton style={{ marginTop: 3, backgroundColor: colors.secondary }} onPress={verifyPAN} >Validate</MainButton>
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
        </TouchableWithoutFeedback>
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
        justifyContent: 'center',
        marginLeft: 30
    },
    tinyLogo: {
        marginTop: 5,
        marginLeft: 10,
        height: 20,
        width: 20
    }
})

export default GeneralSignUp