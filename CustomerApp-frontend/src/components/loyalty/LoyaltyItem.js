import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions, TextInput } from 'react-native';
import Card from '../../../../customer-frontend/src/components/Card'
import MainButton from '../../../../customer-frontend/src/components/MainButton';
import colors from '../../../../customer-frontend/src/constants/colors';
import inputStyles from '../../../../customer-frontend/src/styles/input';
import TitleText from '../../../../customer-frontend/src/components/TitleText';
import LoyaltyItemList from './LoyaltyItemList';
import { useSelector, useDispatch } from 'react-redux';

const LoyaltyItem = ({ loyalty }) => {
    const [loyaltyModalVisible, setLoyaltyModalVisible] = useState(false)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [date, setDate] = useState('')
    const [startTime, setStart] = useState('')
    const [endTime, setEnd] = useState('')

    const token = useSelector(state => state.user.user.token)
    const dispatch = useDispatch()

    const onfetchLoyalty = async () => {
        if (!date || !startTime || !endTime) {
            return setDateModalVisible(true)
        }
        setDateModalVisible(false)
        const body = await JSON.stringify({
            merchantId: loyalty.merchantId,
            customerId: loyalty.customerId,
            points: loyalty.points,
            promocode: loyalty.promocode,
        })
        console.log(body)
        setLoyaltyModalVisible(false)
    }

    const saveLoyalty = async () => {
        const body = await JSON.stringify({
            _id: loyalty._id,
            merchantId: loyalty.merchantId,
            points: loyalty.points
        })
        const updatedCart = await updateCartToDB(body, token)
        dispatch(updateCart(updatedCart))
        setCartModalVisible(false)
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{cart.shopName}</Text>
                        <Text style={styles.text} >Total: ₹{totalCost}</Text>
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setLoyaltyModalVisible(true)} >Check</MainButton>
                </View>
            </Card>
            <Modal
                animationType="slide"
                visible={loyaltyModalVisible}
                onRequestClose={() => {
                    setLoyaltyModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setLoyaltyModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{loyalty.merchantId}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={{ fontFamily: 'open-sans-bold', fontSize: 22 }}>Items</Text>
                    <FlatList
                        data={loyalty.points}
                        renderItem={({ item }) => {
                            return (
                                <LoyaltyItemList item={item} />
                            )
                        }}
                        keyExtractor={item => item.itemId}
                    />
                    <View style={{ marginTop: 20, alignItems: 'center' }} >
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 40 }} >Total: ₹{totalCost}</Text>
                        <MainButton
                            style={{ marginTop: 5, backgroundColor: colors.secondary }}
                            onPress={saveCart}
                        >
                            Redeem Loyalty Points
                        </MainButton>
                        <MainButton style={{ marginTop: 5 }} onPress={onOrder}>Order</MainButton>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                visible={dateModalVisible}
                onRequestClose={() => {
                    setDateModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setLoyaltyModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>Choose merchant to redeem points:</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName}>Merchant</Text>
                    <TextInput
                        style={inputStyles.input}
                        placeholder='MerchantID:'
                        onChangeText={setMerchantID}
                    />
                    <MainButton style={{ marginTop: 5 }} onPress={onOrder}>Use Loyalty</MainButton>
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
        fontSize: 18
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

export default LoyaltyItem