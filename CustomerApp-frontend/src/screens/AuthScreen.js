import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import GetVerificationCodeForm from '../components/authForm/GetVerificationCodeForm';
import SignUpForm from '../components/authForm/SignUpForm';
import EnterVerificationCode from '../components/authForm/EnterVerificationCode';
import Header from '../components/Header';
import { setUser } from '../store/actions/user';
import { setOrders } from '../store/actions/orders';
import findUser from '../apiCalls/findUser';
import { setCarts } from '../store/actions/cart';
import { setRequests } from '../store/actions/serviceRequest';
import getMerchant from '../apiCalls/getMerchants';
import { setGoodsProviders, setServiceProviders } from '../store/actions/merchants';
import { setCustomerCards } from '../store/actions/card';
import getPincode from '../apiCalls/getPincode';

const AuthScreen = (props) => {
    const [existingUser, setExistingUser] = useState(props.userData)

    const checkExistingUser = async (email) => {
        const body = await JSON.stringify({
            email
        })
        const user = await findUser(body)
        return user
    }

    const onGetMerchants = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLocationError('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        let pincode = ''
        const lat = location.coords.latitude
        const lon = location.coords.longitude
        try {
            const data = await getPincode(lat, lon)
            pincode = data.address.postcode
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
                console.log(userData.existingUser)
                if (userData.existingUser) {
                    setExistingUser({
                        token: userData.token,
                        user: userData.user,
                        orders: userData.orders,
                        services: userData.services,
                        carts: userData.carts,
                        cards: userData.cards
                        // loyalty: userData.loyalty
                    })
                }
                else {
                    console.log('sign up')
                    setVerificationStage(<SignUpForm email={email} setLogin={props.setLogin} />)
                }
            }
        }
    }

    const [verificationStage, setVerificationStage] = useState(<GetVerificationCodeForm onVerify={changeVerificationStage} />)

    const dispatch = useDispatch()

    useEffect(() => {
        async function login() {
            await dispatch(setUser({ user: existingUser.user, token: existingUser.token }))
            if (existingUser.services) {
                await dispatch(setRequests(existingUser.services))
            }
            if (existingUser.orders) {
                await dispatch(setOrders(existingUser.orders))
            }
            if (existingUser.carts) {
                await dispatch(setCarts(existingUser.carts))
            }
            if (existingUser.cards) {
                await dispatch(setCustomerCards(existingUser.cards))
            }
            // if (existingUser.loyalty) {
            //     await dispatch(setOrders(existingUser.orders))
            // }
            props.setLogin(true)
        }
        async function populateMerchants() {
            if (existingUser) {
                const merchants = await onGetMerchants()
                console.log(merchants)
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