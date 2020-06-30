import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MainButton from '../MainButton';
import { useSelector, useDispatch } from 'react-redux';
import BodyText from '../BodyText';
import TitleText from '../TitleText';
import paymentCall from '../../apiCalls/pay';
import { updateOrders } from '../../store/actions/orders'
import { updateServices } from '../../store/actions/serviceRequest'

const Pay = ({ setTab, orderId, amount, merchantName, cardNumber, merchantId, expiry, onClose, orderType }) => {
    const customerId = useSelector(state => state.user.user.user._id)
    const [status, setStatus] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const onPay = async () => {
        const body = await JSON.stringify({
            orderId,
            customerId,
            merchantId,
            senderCardExpiryDate: expiry,
            amount,
            senderAccountNumber: cardNumber,
        })
        const transactionDetails = await paymentCall(body)
        if (!transactionDetails.error) {
            setStatus(true)
            if (transactionDetails.order) {
                dispatch(updateOrders(transactionDetails.order))
            } else if (transactionDetails.service) {
                dispatch(updateServices(transactionDetails.service))
            }
            setTab(3)
        }
        else {
            setError('Transaction Failed')
        }
    }

    return (
        <View style={styles.container} >
            {!!error && <BodyText>{error}</BodyText>}
            {!status ?
                <View style={{ alignItems: 'center' }} >
                    <BodyText>Card: {cardNumber}</BodyText>
                    <BodyText>Paying to: {merchantName}</BodyText>
                    <BodyText>Amount: ₹{amount}</BodyText>
                    <MainButton onPress={onPay} >Pay</MainButton>
                </View> :
                <View style={{ alignItems: 'center' }} >
                    <TitleText style={{ color: 'black' }} >Payment Completed</TitleText>
                    <BodyText>Paid to: {merchantName}</BodyText>
                    <BodyText>Amount: ₹{amount}</BodyText>
                    <MainButton style={{ marginTop: 5 }} onPress={onClose} >Close</MainButton>
                    <BodyText>We'll hold your money till you pick up your order or complete your service request</BodyText>
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