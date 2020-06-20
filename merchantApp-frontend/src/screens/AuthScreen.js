import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState(false)

    const checkExistingUser = (email) => {
        //checkExistingUser in DB
        return false
    }

    const changeVerificationStage = (number, email='', vCode='') => {
        if (number === 1) {
            setVerificationStage(<GetVerificationCodeForm onVerify={changeVerificationStage} />)
        }
        else if (number === 2) {
            setVerificationStage(<EnterVerificationCode vCode={vCode} email={email} onVerify={changeVerificationStage} />)
        }
        else if (number === 3) {
            if (!checkExistingUser(email)) {
                setVerificationStage(<SignUpForm email={email} />)
            }
            else {
                props.setLogin(true)
            }
        }
    }

    let [verificationStage, setVerificationStage] = useState(<GetVerificationCodeForm onVerify={changeVerificationStage} />)

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                {verificationStage}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width: Dimensions.get('window').width * 0.8
    }
})

export default AuthScreen