import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';
import Header from '../components/Header';
import { setUser } from '../store/actions/user';
import { useDispatch } from 'react-redux';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState()

    const checkExistingUser = async (email) => {
        const body = await JSON.stringify({
            email
        })
        const response = await fetch('http://192.168.1.6:3000/users/findUser', {
            method: "POST",
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const user = await response.json()
        return user
    }
    
    const changeVerificationStage = async (number, email = '', vCode = '') => {
        if (number === 1) {
            setVerificationStage(<GetVerificationCodeForm onVerify={changeVerificationStage} />)
        }
        else if (number === 2) {
            console.log(vCode)
            setVerificationStage(<EnterVerificationCode vCode={vCode} email={email} onVerify={changeVerificationStage} />)
        }
        else if (number === 3) {
            const userData = await checkExistingUser(email)
            if (userData.existingUser) {
                console.log(userData.token)
                setExistingUser({ token: userData.token, user: userData.user })
                props.setLogin(true)
            }
            else {
                setVerificationStage(<SignUpForm email={email} setLogin={props.setLogin}/>)
            }
        }
    }
    
    let [verificationStage, setVerificationStage] = useState(<GetVerificationCodeForm onVerify={changeVerificationStage} />)
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(setUser(existingUser))
    }, [existingUser])
    
    return (
        <SafeAreaView style={styles.screen} >
            <Header title="MERCHANT APP" />
            {verificationStage}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default AuthScreen