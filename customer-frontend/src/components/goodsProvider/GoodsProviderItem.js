import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import MainButton from '../MainButton';
import InventoryHome from './InventoryHome';
import { addCart } from '../../store/actions/cart'
import { resetItems } from '../../store/actions/cartItems';
import addCartToDB from '../../apiCalls/addCart';
import getInventory from '../../apiCalls/getInventory';

const GoodsProviderItem = ({ item }) => {
    // console.log(item)
    const [merchantModalVisible, setMerchantModalVisible] = useState(false)
    const userData = useSelector(state => state.user.user)

    const token = userData.token

    const items = useSelector(state => state.cartItems.items)
    const dispatch = useDispatch()

    const [inventory, setInventory] = useState()

    const getMerchantInventory = async () => {
        setInventory(await getInventory(token, item._id))
    }

    useEffect(() => {
        getMerchantInventory()
    }, [])

    useEffect(() => {
        if (!merchantModalVisible) {
            dispatch(resetItems())
        }
    }, [merchantModalVisible])

    const addCustomerCart = async () => {
        const body = await JSON.stringify({
            customerName: userData.user.name,
            shopName: item.shopName,
            customerId: userData.user._id,
            merchantId: item._id,
            items
        })
        const newCart = await addCartToDB(body, token)
        dispatch(addCart(newCart))
        dispatch(resetItems())
        setMerchantModalVisible(false)
    }

    return (
        <View>
            <TouchableOpacity style={styles.itemContainer} onPress={() => setMerchantModalVisible(true)}>
                <Text style={styles.itemName} >{item.shopName}</Text>
                <Text style={styles.itemName} >{Math.ceil(item.distance)} km</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={merchantModalVisible}
                onRequestClose={() => {
                    setMerchantModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setMerchantModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{item.shopName}</TitleText>
                </View>
                <View style={styles.itemModalContainer} >
                    <TitleText style={{ color: 'black' }} >Inventory</TitleText>
                    <InventoryHome inventory={inventory} />
                    <MainButton onPress={addCustomerCart} style={{ marginBottom: 100 }}>Add Cart</MainButton>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemName: {
        fontFamily: 'open-sans',
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
    itemModalContainer: {
        flex: 1,
        alignItems: 'center'
    }
})

export default GoodsProviderItem