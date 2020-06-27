import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';
import Header from '../components/Header';
import { setUser } from '../store/actions/user';
import { useDispatch } from 'react-redux';
import { setInventory } from '../store/actions/inventory';
import AsyncStorage from '@react-native-community/async-storage';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState(props.userData)

    const checkExistingUser = async (email) => {
        console.log('called')
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
            setVerificationStage(<EnterVerificationCode vCode={vCode} email={email} onVerify={changeVerificationStage} />)
        }
        else if (number === 3) {
            console.log(number)
            if (!existingUser) {
                const userData = await checkExistingUser(email)
                if (userData.existingUser) {
                    setExistingUser({ token: userData.token, user: userData.user, inventory: userData.inventory })
                }
                else {
                    setVerificationStage(<SignUpForm email={email} setLogin={props.setLogin} />)
                }
            }
        }
    }

    const [verificationStage, setVerificationStage] = useState(<GetVerificationCodeForm onVerify={changeVerificationStage} />)

    const dispatch = useDispatch()

    useEffect(() => {
        async function login() {
            if (existingUser) {
                await dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
                if (existingUser.inventory) {
                    await dispatch(setInventory(existingUser.inventory))
                }
                props.setLogin(true)
            }
        }
        login()
    }, [existingUser])

    useEffect(() => {
        console.log(existingUser)
        if (existingUser) {
            dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
            if (existingUser.inventory) {
                dispatch(setInventory(existingUser.inventory))
            }
            console.log(true)
            props.setLogin(true)
        }
    }, [])

    useEffect(() => {
        async function setToken() {
            try {
                await AsyncStorage.setItem('token', existingUser.token);
                await AsyncStorage.setItem('owner', existingUser.user._id);
                console.log('saved')
            } catch (error) {
                console.log(error)
            }
        }
        if (existingUser)
            setToken()
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