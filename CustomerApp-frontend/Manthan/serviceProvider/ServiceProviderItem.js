import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';

const ServiceProviderItem = ({ item }) => {
    const [merchantModalVisible, setMerchantModalVisible] = useState(false)
    const [dateVisible, setDateVisible] = useState(false)
    const [timeVisible, setTimeVisible] = useState(false)
    const [date, setDate] = useState(Date.now());
    const [time, setTime] = useState(Date.now());

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDateVisible(false)
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
        setTimeVisible(false)
    };

    return (
        <View>
            <TouchableOpacity style={styles.itemContainer} onPress={() => setMerchantModalVisible(true)}>
                <Text style={styles.itemName} >{item.merchantName}</Text>
                <Text style={{ marginTop: 3 }} >{item.distance}</Text>
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
                    <TouchableOpacity onPress={() => {
                        setDateVisible(true)
                        // setMerchantModalVisible(false)
                    }} >
                        <Text style={{ ...styles.itemName, color: colors.primary }} >Date: {moment(date).format("DD MMM YYYY")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setTimeVisible(true)
                        // setMerchantModalVisible(false)
                    }} >
                        <Text style={{ ...styles.itemName, color: colors.primary }} >Time: {moment(time).format("hh mm A")}</Text>
                    </TouchableOpacity>
                    <TextInput
                        multiline={true}
                        style={{ ...inputStyle.input, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width * 0.8 }}
                        placeholder='Description'
                        selection={{ start: 0, end: 0 }}
                    />
                    <MainButton style={{ marginTop: 5 }}>Request Service</MainButton>
                </View>
                {dateVisible && <RNDateTimePicker mode="date" onChange={onChangeDate} value={date} />}
                {timeVisible && <RNDateTimePicker mode="time" onChange={onChangeTime} value={time} />}
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
        fontSize: 20
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