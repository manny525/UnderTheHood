import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../Card';
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import OrderItemList from './OrderItemList';
import inputStyle from '../../styles/input';
import { updateOrders } from '../../store/actions/orders';

const OrderItem = ({ order, setTab }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)
    const [vCode, setVcode] = useState('')

    const dispatch = useDispatch()

    const orderStatusChange = async () => {
        let status
        if (order.status === 'pending') {
            status = 'ready'
        }
        else if (order.status === 'ready') {
            status = 'completed'
            //receive payment if vCode right
        }
        //api call by passing status
        dispatch(updateOrders({
            ...order,
            status
        }))
        setOrderModalVisible(false)
        if (status === 'ready') {
            setTab(2)
        }
        else if (status === 'completed') {
            setTab(3)
        }
    }

    const vCodeChange = (text) => {
        if (text.length === '6') {
            setVCode(text)
        }
    }

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.customerName}</Text>
                        <Text style={styles.text} >{order.pickUpTime.date}</Text>
                        <Text style={styles.text} >{order.pickUpTime.start} - {order.pickUpTime.end}</Text>
                    </View>
                    <MainButton style={{ width: 95 }} onPress={() => setOrderModalVisible(true)} >Check</MainButton>
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
                    <TitleText>Customer: {order.customerName}</TitleText>
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
                        <Text style={{ fontFamily: 'open-sans-bold', fontSize: 40 }} >Total: ₹400</Text>
                        {order.status === 'ready' &&
                            <TextInput 
                                style={inputStyle.input} 
                                placeholder="Verification Code"
                                onChangeText={vCodeChange}
                                keyboardType='number-pad'     
                                maxLength={6}
                            />}
                        {order.status !== 'completed' && <MainButton onPress={orderStatusChange} style={{ marginTop: 5 }}>
                            {order.status === 'pending' ? 'Ready' : 'Complete'}</MainButton>}
                    </View>
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