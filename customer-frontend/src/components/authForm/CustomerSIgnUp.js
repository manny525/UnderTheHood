import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import { setUser } from '../../store/actions/user';
import registerUser from '../../apiCalls/registerUser';
import { setGoodsProviders, setServiceProviders } from '../../store/actions/merchants';
import getMerchant from '../../apiCalls/getMerchants';
import getPincode from '../../apiCalls/getPincode';

const CustomerSignUp = (props) => {
    const [existingUser, setExistingUser] = useState(null)
    const [customerName, setCustomerName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [error, setError] = useState('')
    
    const dispatch = useDispatch()
    
    const onGetMerchants = async () => {
        let { status } = await Location.requestPermissionsAsync();
        let location = await Location.getCurrentPositionAsync({});
        let pincode = ''
        const lat = location.coords.latitude
        const lon = location.coords.longitude
        try {
            const res = await getPincode(lat, lon)
            pincode = res.address.postcode
            let body = ({
                postalCode: pincode,
                lat,
                lon,
                token: existingUser.token,
                typeOfMerchant: 'goods'
            })
            const goodsProviders = await getMerchant(body)
            body.typeOfMerchant = 'service'
            const serviceProviders = await getMerchant(body)
            return {
                goodsProviders,
                serviceProviders
            }
        } catch (error) {
            return error
        }
    }


    const onSubmit = async () => {
        if (!customerName || !mobileNumber) {
            setError('*Please provide all the details to register')
        }
        else {
            setError('')
            try {
                const body = await JSON.stringify({
                    email: props.email,
                    name: customerName,
                    contact: mobileNumber
                })
                const userData = await registerUser(body)
                setExistingUser({ user: userData.user, token: userData.token })
            } catch (e) {
                console.log(e)
            }
        }
    }


    useEffect(() => {
        async function login() {
            dispatch(setUser(existingUser))
            props.setLogin(true)
        }
        async function populateMerchants() {
            if (existingUser) {
                const merchants = await onGetMerchants()
                // console.log(merchants)
                await dispatch(setGoodsProviders(merchants.goodsProviders))
                await dispatch(setServiceProviders(merchants.serviceProviders))
                login()
            }
        }
        populateMerchants()
    }, [existingUser])

    useEffect(() => {
        async function setToken() {
            try {
                await AsyncStorage.setItem('token', existingUser.token);
            } catch (error) {
                console.log(error)
            }
        }
        if (existingUser)
            setToken()
    }, [existingUser])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <KeyboardAvoidingView style={styles.formContainer}>
                {!!error && <Text>{error}</Text>}
                <TextInput
                    style={inputStyle.input}
                    placeholder='Customer Name'
                    onChangeText={(text) => { setCustomerName(text) }}
                    value={customerName}
                />
                <TextInput
                    style={inputStyle.input}
                    placeholder='Mobile Number'
                    onChangeText={(text) => { setMobileNumber(text) }}
                    value={mobileNumber}
                    keyboardType='number-pad'
                />
                <MainButton
                    style={{ marginTop: 5 }}
                    onPress={onSubmit}>Register</MainButton>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: 10,
        alignItems: 'center'
    },
    tinyLogo: {
        marginTop: 5,
        marginLeft: 10,
        height: 20,
        width: 20
    }
})

export default CustomerSignUp