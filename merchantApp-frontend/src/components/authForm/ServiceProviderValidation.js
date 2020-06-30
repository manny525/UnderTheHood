import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { setUser } from '../../store/actions/user';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import getPincode from '../../apiCalls/getPincode';
import newUser from '../../apiCalls/newUser';

const ServiceProviderValidation = (props) => {
    const [location, setLocation] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [locationError, setLocationError] = useState('')
    const [error, setError] = useState('')
    const [serviceProviderType, setServiceProviderType] = useState('')
    const [existingUser, setExistingUser] = useState(null)
    const [pinCode, setPinCode] = useState(null)

    const [typeOfServiceProviders, setTypeofServiceProviders] = useState(['Barber', 'Electrician', 'Mechanic', 'Car Washer', 'Plumber',])

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
            const res = await getPincode(lat, log)
            setPinCode(res.address.postcode)
        } catch (error) {

        }

    }

    const onSubmit = async () => {
        if (!location || !serviceProviderType) {
            setError('*Please provide all the details to register')
        }
        else {
            setError('')
            const body = await JSON.stringify({
                email: props.data.email,
                merchantName: props.data.merchantName,
                typeOfMerchant: props.data.merchantType,
                providerOf: serviceProviderType,
                pan: props.data.merchantPAN,
                location: {
                    lat: location.coords.latitude,
                    lon: location.coords.longitude,
                    postalCode: pinCode
                }
            })
            try {
                const userData = await newUser(body)
                setExistingUser({ user: userData.user, token: userData.token })
            } catch (e) {
                console.log(e)
            }
        }
    }

    const dispatch = useDispatch()

    useEffect(() => {
        if (existingUser) {
            dispatch(setUser(existingUser))
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
        <View style={styles.formContainer}>
            {error ? <Text> {error} </Text> : <></>}
            <Picker
                style={styles.onePicker} itemStyle={styles.onePickerItem}
                mode='dropdown'
                selectedValue={serviceProviderType}
                onValueChange={(itemValue, itemIndex) => setServiceProviderType(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                {
                    typeOfServiceProviders.map(type => <Picker.Item key={type} label={type} value={type.toLowerCase()} />)
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
                    style={{ paddingHorizontal: 15, paddingVertical: 8, backgroundColor: colors.secondary }}>Get Location</MainButton>
            }
            <MainButton
                style={{ marginTop: 5 }}
                onPress={onSubmit}>Register</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    dropdown: {
        paddingHorizontal: Dimensions.get('window').width / 4
    },
    picker: {
    },
    onePicker: {
        height: 30,
        width: Dimensions.get('window').width * 0.5,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    tinyLogo: {
        marginLeft: 10,
        height: 20,
        width: 20
    },
    mapStyle: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height / 3,
    }
})

export default ServiceProviderValidation