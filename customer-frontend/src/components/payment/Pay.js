import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MainButton from '../MainButton';
import { useSelector, useDispatch } from 'react-redux';
import BodyText from '../BodyText';
import TitleText from '../TitleText';
import paymentCall from '../../apiCalls/pay';
import { updateOrders } from '../../store/actions/orders'

const Pay = ({ setTab, orderId, amount, merchantName, cardNumber, merchantId, expiry, onClose, orderType }) => {
    const customerId = useSelector(state => state.user.user.user._id)
    const [status, setStaus] = useState(false)

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
        setStaus(true)
        if (orderType === 'goods') {
            dispatch(updateOrders(transactionDetails.order))
        } else if (orderType === 'service') {

        }
        setTab(3)
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
                    <TitleText style={{ color: 'black' }} >Payment Completed</TitleText>
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