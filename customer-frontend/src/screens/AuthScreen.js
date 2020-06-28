import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';
import Header from '../components/Header';
import { setUser } from '../store/actions/user';
import { useDispatch } from 'react-redux';
import { setInventory } from '../store/actions/inventory';
import { setOrders } from '../store/actions/orders';
import AsyncStorage from '@react-native-community/async-storage';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState(props.userData)

    const checkExistingUser = async (email) => {
        const body = await JSON.stringify({
            email
        })
        const user = await findUser(body)
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
            if (!existingUser) {
                const userData = await checkExistingUser(email)
                if (userData.existingUser) {
                    setExistingUser({
                        token: userData.token,
                        user: userData.user,
                        orders: userData.orders,
                        requests: userData.requests
                    })
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
                if (existingUser.requests) {
                    await dispatch(setRequests(existingUser.requests))
                }
                if (existingUser.orders) {
                    await dispatch(setOrders(existingUser.orders))
                }
                props.setLogin(true)
            }
        }
        login()
    }, [existingUser])

    useEffect(() => {
        async function login() {
            if (existingUser) {
                await dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
                if (existingUser.requests) {
                    await dispatch(setRequests(existingUser.requests))
                }
                if (existingUser.orders) {
                    await dispatch(setOrders(existingUser.orders))
                }
                props.setLogin(true)
            }
        }
        login()
    }, [])

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
        <SafeAreaView style={styles.screen} >
            <Header title="CUSTOMER APP" />
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