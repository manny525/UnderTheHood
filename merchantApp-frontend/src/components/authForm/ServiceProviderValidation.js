import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions, Picker, Image } from 'react-native';
import inputStyle from '../../styles/input';
import MainButton from '../MainButton'
import colors from '../../constants/colors';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const ServiceProviderValidation = (props) => {
    const [merchantPAN, setMerchantPAN] = useState('')
    const [location, setLocation] = useState(null)
    const [imgSrc, setImgSrc] = useState(null)
    const [locationError, setLocationError] = useState('')
    const [error, setError] = useState('')
    const [serviceProviderType, setServiceProviderType] = useState('')

    const [typeOfServiceProviders, setTypeofServiceProviders] = useState(['Barber', 'Electrician', 'Mechanic', 'Car Washer', 'Plumber', ])

    const onGetLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setLocationError('Permission to access location was denied');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
    }

    const onSubmit = async () => {
        if (!location || !merchantPAN || !serviceProviderType) {
            setError('*Please provide all the details to register')
        }
        else {
            setError('')
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
            {error ? <Text> {error} </Text> : <></>}
            <Picker
                style={styles.onePicker} itemStyle={styles.onePickerItem}
                mode='dropdown'
                selectedValue={serviceProviderType}
                onValueChange={(itemValue, itemIndex) => setServiceProviderType(itemValue)}
            >
                <Picker.Item label="Select" value="" />
                {
                    typeOfServiceProviders.map(type => <Picker.Item key={type} label={type} value={type.toLowerCase()} /> )
                }
            </Picker>
            <View style={styles.panContiner}>
                <TextInput style={{ ...inputStyle.input, width: 200, marginTop: 1 }} placeholder="Merchant PAN" onChangeText={veriftPANLength} maxLength={16} />
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