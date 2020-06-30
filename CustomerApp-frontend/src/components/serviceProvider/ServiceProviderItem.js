import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import newRequest from '../../apiCalls/requestService';
import { addRequest } from '../../store/actions/serviceRequest';

const ServiceProviderItem = ({ item }) => {
    const [merchantModalVisible, setMerchantModalVisible] = useState(false)
    const [date, setDate] = useState();
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()

    const token = useSelector(state => state.user.user.token)

    const onRequest = async () => {
        const body = await JSON.stringify({
            merchantId: item._id,
            merchantName: item.merchantName,
            date,
            description
        })
        const request = await newRequest(body, token)
        dispatch(addRequest(request))
        setMerchantModalVisible(false)
    }

    return (
        <View>
            <TouchableOpacity style={styles.itemContainer} onPress={() => setMerchantModalVisible(true)}>
                <Text style={styles.itemName} >{item.merchantName}</Text>
                <Text style={styles.itemName} >{Math.ceil(item.distance)} km</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={merchantModalVisible}
                onRequestClose={() => {
                    setMerchantModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setMerchantModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{item.merchantName}</TitleText>
                </View>
                <View style={styles.itemModalContainer} >
                    <TitleText style={{ color: 'black', marginBottom: 5 }} >{item.type.toUpperCase()}</TitleText>
                    <TextInput
                        multiline={true}
                        style={inputStyle.input}
                        placeholder='Date: dd/mm'
                        onChangeText={setDate}
                    />
                    <TextInput
                        multiline={true}
                        style={{ ...inputStyle.input, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width * 0.8 }}
                        placeholder='Description'
                        onChangeText={(text) => setDescription(text)}
                    />
                    <MainButton style={{ marginTop: 5 }} onPress={onRequest}>Request Service</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 14
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    },
    modalHeader: {
        alignItems: 'center'
    },
    tinyLogo: {
        height: 40,
        width: 40
    },
    itemModalContainer: {
        alignItems: 'center',
        marginTop: 10
    }
})

export default ServiceProviderItem