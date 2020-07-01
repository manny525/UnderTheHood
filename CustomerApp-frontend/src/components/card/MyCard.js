import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, Modal, Image, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddNewCard from './AddNewCard';
import { deleteCustomerCard } from '../../store/actions/card';
import TitleText from '../TitleText';
import colors from '../../constants/colors';
import inputStyles from '../../styles/input'
import MainButton from '../MainButton';
import Pay from '../payment/Pay'

export default function MyCard({ setTab, orderDetails, setPayModalVisible, orderType }) {
    const [cardModalVisible, setCardModalVisible] = useState(false)
    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const cards = useSelector(state => state.cards.cardList);
    const dispatch = useDispatch()
    const [vCode, setVCode] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cardNumber, setCardNumber] = useState('')

    const addNewCard = () => {
        setCardModalVisible(true)
    }

    const onClose = () => {
        setPaymentModalVisible(false)
        setPayModalVisible(false)
    }

    const myCards = cards.map(item => {
        const onUseCard = async () => {
            setCardNumber(item.number)
            setExpiry(item.date)
            setPaymentModalVisible(true)
        }

        return (
            <View style={styles.cardsLayout} key={item.number}>
                <View>
                    <Text>{item.number}</Text>
                    <Text>Valid till: {item.date}</Text>
                    <MainButton onPress={onUseCard} >Use</MainButton>
                </View>
                <View>
                    <TouchableOpacity onPress={() => dispatch(deleteCustomerCard(item.number))}>
                        <Text>
                            <Ionicons name="ios-trash" size={32} />
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    })

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.body}>
                    <View style={styles.cards}>
                        {myCards}
                    </View>
                    <View style={styles.buttonView}>
                        <MainButton onPress={addNewCard} >Add Card</MainButton>
                    </View>
                </View>
            </ScrollView>
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
                    <TitleText>Add Card</TitleText>
                </View>
                <AddNewCard setCardModalVisible={setCardModalVisible} />
            </Modal>
            <Modal
                animationType="slide"
                visible={paymentModalVisible}
                onRequestClose={() => {
                    setPaymentModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TitleText>PAY</TitleText>
                </View>
                <Pay
                    setTab={setTab}
                    onClose={onClose}
                    orderId={orderDetails._id}
                    amount={orderDetails.totalCost}
                    merchantName={orderDetails.merchantName || orderDetails.shopName}
                    merchantId={orderDetails.merchantId}
                    cardNumber={cardNumber}
                    expiry={expiry}
                    orderType={orderType}
                />
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    body: {
        flex: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
        padding: 10
    },
    cardsLayout: {
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#D4CFCF',
        paddingVertical: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    deleteButton: {
        backgroundColor: '#525252',
        padding: 5,
        borderRadius: 10,
        paddingHorizontal: 10

    },
    cards: {
        padding: 10,
        backgroundColor: '#fff'
    },
    buttonView: {
        alignItems: 'center'
    },
    button: {
        width: 200,
        backgroundColor: '#1a1f71',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    listContainer: {
        backgroundColor: '#dce2ff',
        padding: 16
    },
    listText: {
        fontSize: 30
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