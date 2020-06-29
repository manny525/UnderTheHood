import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions, TextInput } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input';
import moment from 'moment'
import { updateRequest } from '../../store/actions/serviceRequest';
import { useDispatch } from 'react-redux';

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [timeVisible, setTimeVisible] = useState(false)
    const [time, setTime] = useState(Date.now());

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
        setTimeVisible(false)
    };

    const dispatch = useDispatch()

    const orderStatusChange = async () => {
        let status
        if (order.status === 'new') {
            status = 'upcoming'
        }
        else if (order.status === 'upcoming') {
            status = 'completed'
            //receive payment if vCode right
        }
        // api call by passing status
        dispatch(updateRequest({
            ...order,
            status
        }))
        setOrderModalVisible(false)
        if (status === 'upcoming') {
            setTab(1)
        }
        else if (status === 'completed') {
            setTab(3)
        }
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.customerName}</Text>
                        <Text style={styles.text} >{order.date}</Text>
                        {order.status === 'upcoming' &&
                            <Text style={styles.text} >{order.time}</Text>}
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setOrderModalVisible(true)} >Check</MainButton>
                </View>
                {timeVisible && order.status === 'new' &&
                    <RNDateTimePicker mode="time" onChange={onChangeTime} value={time} />}
            </Card>
            <Modal
                animationType="slide"
                visible={orderModalVisible}
                onRequestClose={() => {
                    setOrderModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setOrderModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{order.customerName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <TitleText style={{ color: 'black' }} >Date: {order.date}</TitleText>
                    {order.status === 'new' &&
                        <TouchableOpacity onPress={() => {
                            setTimeVisible(true)
                        }} >
                            <Text style={{ ...styles.itemName, color: colors.primary }} >Time: {moment(time).format("hh:mm A")}</Text>
                        </TouchableOpacity>}
                    <TextInput
                        editable={false}
                        multiline={true}
                        style={{ ...inputStyle.input, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width * 0.8 }}
                        placeholder='Description'
                        selection={{ start: 0, end: 0 }}
                        value={order.description}
                    />
                    {order.status !== 'completed' &&
                        <MainButton style={{ marginTop: 5 }} onPress={orderStatusChange}>
                            {order.status === 'new' ? 'Accept' : 'Complete'}
                        </MainButton>}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'open-sans-bold',
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
    itemName: {
        fontFamily: 'open-sans',
        fontSize: 20
    },
    itemModalContainer: {
        alignItems: 'center'
    }
})

export default OrderItem