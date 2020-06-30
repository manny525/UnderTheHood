import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TextInput } from 'react-native';
import MainButton from '../MainButton';
import { useSelector } from 'react-redux';
import Header from '../Header';
import BodyText from '../BodyText';
import inputStyles from '../../styles/input';
import TitleText from '../TitleText';
import paymentCall from '../../apiCalls/pay';

const Pay = ({ amount, merchantName, cardNumber, merchantId, expiry, onClose }) => {
    const [error, setError] = useState('')
    const token = useSelector(state => state.user.user.token)
    const customerId = useSelector(state => state.user.user.user._id)
    const [status, setStaus] = useState(false)

    const onPay = async () => {
        const body = await JSON.stringify({
            customerId,
            merchantId,
            senderCardExpiryDate: expiry,
            amount,
            senderAccountNumber: cardNumber,
        })
        const transactionDetails = await paymentCall(body)
        setStaus(true)
        console.log(transactionDetails)
    }

    return (
        <View style={styles.container} >
            {!status ?
                <View style={{ alignItems: 'center' }} >
                    <BodyText>Card: {cardNumber}</BodyText>
                    <BodyText>Paying to: {merchantName}</BodyText>
                    <BodyText>Amount: ₹{amount}</BodyText>
                    <MainButton onPress={onPay} >Pay</MainButton>
                </View> :
                <View style={{ alignItems: 'center' }} >
                    <TitleText style={{color: 'black'}} >Payment Completed</TitleText>
                    <BodyText>Paid to: {merchantName}</BodyText>
                    <BodyText>Amount: ₹{amount}</BodyText>
                    <MainButton style={{ marginTop: 5 }} onPress={onClose} >Close</MainButton>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Pay