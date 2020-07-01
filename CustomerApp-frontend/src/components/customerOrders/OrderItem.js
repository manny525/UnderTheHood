import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import OrderItemList from './OrderItemList';
import MyCard from '../card/MyCard';

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [cardModalVisible, setCardModalVisible] = useState(false)

    const onPay = async () => {
        setCardModalVisible(true)
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.shopName}</Text>
                        <Text style={styles.text} >{order.pickUpTime.date}</Text>
                        <Text style={styles.text} >{order.pickUpTime.start} - {order.pickUpTime.end}</Text>
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
                    <TitleText>{order.shopName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={{ fontFamily: 'open-sans-bold', fontSize: 22 }}>Items</Text>
                    <FlatList
                        data={order.items}
                        renderItem={({ item }) => {
                            return (
                                <OrderItemList item={item} orderType={order.status} />
                            )
                        }}
                        keyExtractor={item => item.itemId}
                    />
                    <View style={{ marginTop: 20, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 40 }} >Total: ₹{order.totalCost}</Text>
                        {order.status === 'paymentdone' &&
                            <Text style={{ fontFamily: 'open-sans-bold', fontSize: 25 }} >
                                Order Completed
                            </Text>}
                        {order.status === 'ready' &&
                            <Text style={{ fontFamily: 'open-sans-bold', fontSize: 16 }} >
                                Pay to receive Payment OTP
                            </Text>}
                        {order.status === 'completed' &&
                            <Text style={{ fontFamily: 'open-sans-bold', fontSize: 16 }} >
                                Provide the received OTP while pick-up
                            </Text>}
                        {order.status === 'pending' &&
                            <Text style={{ fontFamily: 'open-sans-bold', fontSize: 16 }} >
                                Wait for the merchant to accept
                            </Text>}
                        {order.status === 'ready' &&
                            <MainButton style={{ marginTop: 5 }} onPress={onPay} >Pay</MainButton>}
                    </View>
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
                <MyCard setTab={setTab} orderDetails={order} setPayModalVisible={setCardModalVisible} orderType='goods' />
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