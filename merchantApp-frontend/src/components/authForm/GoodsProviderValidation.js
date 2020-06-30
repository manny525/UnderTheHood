import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { setUser } from '../../store/actions/user';
import { setInventory } from '../../store/actions/inventory';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const GoodsProviderValidation = (props) => {
    const [location, setLocation] = useState(null)
    const [pinCode, setPinCode] = useState('')
    const [imgSrc, setImgSrc] = useState(null)
    const [shopName, setShopName] = useState('')
    const [locationError, setLocationError] = useState('')
    const [error, setError] = useState('')
    const [goodsProviderType, setGoodsProviderType] = useState('')
    const [existingUser, setExistingUser] = useState(null)
    const [inventory, setUserInventory] = useState(null)

    const [typeOfGoodsProviders, setTypeofGoodsProviders] = useState(['Grocery', 'Medical', 'Hardware', 'Computer Accessories'])

    const onGetLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLocationError('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
        const lat = location.coords.latitude
        const log = location.coords.longitude
        try {
            const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=6ed4de0702acb6&lat=${lat}&lon=${log}&format=json`)
            const data = await res.json()
            setPinCode(data.address.postcode)
        } catch (error) {

        }

    }

    const onSubmit = async () => {
        if (!location || !goodsProviderType || !shopName) {
            setError('*Please provide all the details to register')
        }
        else {
            setError('')
            const body = await JSON.stringify({
                email: props.data.email,
                merchantName: props.data.merchantName,
                typeOfMerchant: props.data.merchantType,
                aadhar: props.data.aadhar,
                shopName,
                providerOf: goodsProviderType,
                pan: props.merchantPAN,
                location: {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                    postalCode: pinCode
                }
            })
            fetch('http://192.168.1.6:3000/users/newUser', {
                method: "POST",
                body,
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(userData =>  {
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
            dispatch(setInventory(inventory))
            props.setLogin(true, existingUser)
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
                {error ? <Text> {error} </Text> : <></>}
                <TextInput
                    style={inputStyle.input}
                    placeholder='Shop Name'
                    onChangeText={(text) => { setShopName(text) }}
                    value={shopName}
                />
                <Picker
                    style={styles.onePicker} itemStyle={styles.onePickerItem}
                    mode='dropdown'
                    selectedValue={goodsProviderType}
                    onValueChange={(itemValue, itemIndex) => setGoodsProviderType(itemValue)}
                >
                    <Picker.Item label="Select" value="" />
                    {
                        typeOfGoodsProviders.map(type => <Picker.Item key={type} label={type} value={type.toLowerCase()} />)
                    }
                </Picker>
                {location ?
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                            title={'Shop Location'}
                        />
                    </MapView> :
                    <MainButton
                        onPress={onGetLocation}
                        style={{ paddingHorizontal: 15, backgroundColor: colors.secondary }}>Get Location</MainButton>
                }
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
    dropdown: {
        paddingHorizontal: Dimensions.get('window').width / 4
    },
    onePicker: {
        height: 30,
        width: Dimensions.get('window').width * 0.5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
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
        marginLeft: 30
    },
    tinyLogo: {
        marginTop: 5,
        marginLeft: 10,
        height: 20,
        width: 20
    },
    mapStyle: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height / 3,
    }
})

export default GoodsProviderValidation