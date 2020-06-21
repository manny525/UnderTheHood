import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const GoodsProviderValidation = (props) => {
    const [merchantPAN, setMerchantPAN] = useState('')
    const [location, setLocation] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [shopName, setShopName] = useState('')
    const [locationError, setLocationError] = useState('')
    const [error, setError] = useState('')
    const [goodsProviderType, setGoodsProviderType] = useState('')
    const [pinCode, setPinCode] = useState('')

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
        if (!location || !merchantPAN || !goodsProviderType || !shopName) {
            setError('*Please provide all the details to register')
        }
        else {
            // console.log(props.data)
            // console.log({ lat: location.coords.latitude, lon: location.coords.longitude, pinCode })
            // console.log(goodsProviderType)
            // console.log(merchantPAN)
            setError('')
            const body = await JSON.stringify({
                email: props.data.email,
                merchantName: props.data.merchantName,
                typeOfMerchant: props.data.merchantType,
                aadhar: props.data.aadhar,
                providerOf: goodsProviderType,
                pan: merchantPAN,
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
            .then(resJson => console.log(resJson))
            .catch(e => console.log(e))
        }
    }

    const veriftPANLength = async (text) => {
        if (text.length === 0) {
            setImgSrc(null)
            setMerchantPAN('')
        }
        else if (text.length != 16) {
            setImgSrc(require('../../../assets/redcross.png'))
            setMerchantPAN('')
        }
        else if (text.length === 16) {
            //render loading symbol
            //use account validation and after validation render green tick
            setMerchantPAN(text)
            setImgSrc(require('../../../assets/greentick.png'))
        }
    }

    return (
        <View style={styles.formContainer}>
            <TextInput
                style={inputStyle.input}
                placeholder='Shop Name'
                onChangeText={(text) => { setShopName(text) }}
                value={shopName}
            />
            {error ? <Text> {error} </Text> : <></>}
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
            <View style={styles.panContiner}>
                <TextInput
                    style={{ ...inputStyle.input, width: 200, marginTop: 1 }}
                    placeholder="Merchant PAN"
                    onChangeText={veriftPANLength}
                    maxLength={16}
                    keyboardType='number-pad'
                />
                {imgSrc ? <Image style={styles.tinyLogo} source={imgSrc} /> : <></>}
            </View>
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
        flexDirection: 'row'
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

export default GoodsProviderValidation