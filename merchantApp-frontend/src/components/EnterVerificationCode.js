import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MainButton from './MainButton';
import inputStyle from '../styles/input';

const EnterVerificationCode = (props) => {
    const [vCode, setVCode] = useState('')
    const validateCode = () => {
        if (vCode === props.vCode) {
            props.onVerify(3, props.email)
        }
    }
    const onCancel = () => {
        props.onVerify(1)
        console.log('cancel')
    }
    return (
        <View style={styles.screen}>
            <TextInput
                style={inputStyle.input}
                placeholder='Verification Code'
                keyboardType='number-pad'
                onChangeText={(text) => { setVCode(text) }}
                value={vCode}
            />
            <MainButton style={{ marginVertical: 5, paddingVertical: 8 }} onPress={validateCode}>Verify</MainButton>
            <MainButton style={{ paddingVertical: 8 }} onPress={onCancel}>Cancel</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    }
})

export default EnterVerificationCode