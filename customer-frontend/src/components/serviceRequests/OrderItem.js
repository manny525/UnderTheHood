import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input';
import MyCard from '../card/MyCard';
import Card from '../Card';

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [cardModalVisible, setCardModalVisible] = useState(false)
    const [totalCost, setTotalCost] = useState('')

    const onPay = async () => {
        setCardModalVisible(true)
    }
    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.merchantName}</Text>
                        <Text style={styles.text} >{order.date}</Text>
                        {order.status === 'upcoming' &&
                            <Text style={styles.text} >{order.time}</Text>}
                    </View>
                    <MainButton
                        style={{ width: 90 }}
                        textStyle={{ fontSize: 14 }}
                        onPress={() => setOrderModalVisible(true)}>
                        Check
                    </MainButton>
                </View>
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
                    <TitleText>{order.merchantName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <TitleText style={{ color: 'black' }} >Date: {order.date}</TitleText>
                    {order.status === 'new' &&
                        <TouchableOpacity onPress={() => {
                            setTimeVisible(true)
                        }} >
                            <Text style={{ ...styles.itemName, color: colors.primary }} >Time: {order.time}</Text>
                        </TouchableOpacity>}
                    <TextInput
                        editable={false}
                        multiline={true}
                        style={{ ...inputStyle.input, height: Dimensions.get('window').height / 3, width: Dimensions.get('window').width * 0.8 }}
                        placeholder='Description'
                        selection={{ start: 0, end: 0 }}
                        value={order.description}
                    />
                    {order.status === 'new' &&
                        <View style={styles.itemModalContainer} >
                            <TextInput
                                style={{...inputStyle.input, width: 150}}
                                placeholder='Amount'
                                onChangeText={setTotalCost}
                                keyboardType='number-pad'
                            />
                            <MainButton style={{ marginTop: 5 }} onPress={onPay} >Pay</MainButton>
                        </View>}
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={cardModalVisible}
                onRequestClose={() => {
                    setCardModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setCardModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>MY CARDS</TitleText>
                </View>
                <MyCard setTab={setTab} orderDetails={{ ...order, totalCost }} setPayModalVisible={setCardModalVisible} orderType='service' />
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