import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import Card from '../Card'
import MainButton from '../MainButton';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import OrderItemList from './OrderItemList';

const OrderItem = ({ order }) => {
    const [orderModalVisible, setOrderModalVisible] = useState(false)

    return (
        <View>
            <Card style={{ marginTop: 10, flex: 1, borderColor: colors.secondary, borderWidth: 1 }} >
                <View style={styles.itemContainer}>
                    <View>
                        <Text style={styles.text} >{order.shopName}</Text>
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
                    <TitleText>{order.shopName}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={{fontFamily: 'open-sans-bold', fontSize: 22}}>Items</Text>
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
                        {order.status !== 'Completed' && <MainButton style={{ marginTop: 5 }}>
                        {order.status === 'Pending' ? 'Accept' : 'Complete'}</MainButton>}
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