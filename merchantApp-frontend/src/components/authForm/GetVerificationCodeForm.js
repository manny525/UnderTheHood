import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput, Text, Keyboard } from 'react-native';
import inputStyles from '../../styles/input';
import MainButton from '../MainButton';
import validator from 'validator';

const GetVerificationCodeForm = (props) => {
    const [emailText, setEmailText] = useState('')
    const [errorText, setErrorText] = useState('')
    const validateEmail = async () => {
        if (validator.isEmail(emailText)) {
            setErrorText('')
            Keyboard.dismiss()
            const body = JSON.stringify( { email: emailText } )
            // fetch('http://192.168.1.6:3000/users/verifyEmail', {
            //     method: "POST",
            //     body,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            //     .then(res => res.json())
            //     .then(res => props.onVerify(2, emailText, res.vCode.toString()))
            //     .catch(e => console.log(e))
            props.onVerify(2, emailText, '123456')
        }
        else {
            setErrorText('*Enter valid email id')
        }
    }
    return (
        <View style={styles.formContainer}>
            <Text>{errorText}</Text>
            <TextInput
                style={inputStyles.input}
                placeholder='Email Id'
                onChangeText={(text) => { setEmailText(text) }}
                value={emailText}
                keyboardType='email-address'
            />
            <MainButton onPress={validateEmail}>Verify</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 0,
        alignItems: 'center'
    }
})

export default GetVerificationCodeForm