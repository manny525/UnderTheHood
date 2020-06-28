import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import { setUser } from '../../store/actions/user';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const CustomerSignUp = (props) => {
    const [existingUser, setExistingUser] = useState(null)
    const [customerName, setcustomerName] = useState('')
    const [mobileNumber, setmobileNumber] = useState('')
    const [referral, setReferral] = useState('')
    const [imgSrc, setImgSrc] = useState(null)
    const [error, setError] = useState('')

    const onSubmit = async () => {
        if (!location || !merchantPAN || !goodsProviderType || !shopName) {
            setError('*Please provide all the details to register')
        }
        else {
            setError('')
            const body = await JSON.stringify({
                email: props.email,
                customerName,
                mobileNumber
            })
            fetch('http://192.168.1.6:3000/users/newUser', {
                method: "POST",
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(userData => {
                    setUserInventory(userData.inventory)
                    setExistingUser({ user: userData.user, token: userData.token })
                })
                .catch(e => console.log(e))
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (existingUser) {
            dispatch(setUser(existingUser))
            props.setLogin(true)
        }
    }, [existingUser])

    useEffect(() => {
        async function setToken() {
            try {
                await AsyncStorage.setItem('token', existingUser.token);
                await AsyncStorage.setItem('owner', existingUser.user._id);
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
                    onChangeText={(text) => { setMerchantName(text) }}
                    value={merchantName}
                />
                <TextInput
                    style={inputStyle.input}
                    placeholder='Mobile Number'
                    onChangeText={(text) => { setmobileNumber(text) }}
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