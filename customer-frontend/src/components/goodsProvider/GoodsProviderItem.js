import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import InventoryHome from './InventoryHome';
import { addCart } from '../../store/actions/cart'
import { resetItems } from '../store/actions/cartItems';

const GoodsProviderItem = ({ item }) => {
    const [merchantModalVisible, setMerchantModalVisible] = useState(false)
    const [addToCart, setAddtoCart] = useState(false)
    const userData = useSelector(state => state.user.user)
    // const [items, setItems] = useState(null)

    const items = useSelector(state => state.cartItems.items)
    const dispatch = useDispatch()

    const inventory = { //fetch inventort call
        owner: 'm1',
        categories: [{
            categoryName: "Biscuits",
            _id: 'c1',
            items: [{
                itemId: '45641',
                itemName: "A",
                available: true,
                sellingPrice: '20'
            },
            {
                itemId: "45631",
                itemName: "B",
                available: true,
                sellingPrice: '20'
            },
            {
                itemId: "4561",
                itemName: "C",
                available: false,
                sellingPrice: '20'
            }
            ]
        }, {
            categoryName: "Cold Drinks",
            _id: 'c2',
            items: [{
                itemId: "4564",
                itemName: "D",
                available: true,
                sellingPrice: '20'
            },
            {
                itemId: "456344",
                itemName: "E",
                available: true,
                sellingPrice: '20'
            },
            {
                itemId: "45611",
                itemName: "F",
                available: false,
                sellingPrice: '20'
            }
            ]
        }]
    }

    const addCustomerCart = () => {
        const cart = {
            _id: 'c_1',
            customerName: userData.user.name,
            shopName: item.shopName,
            customerId: userData.user._id,
            merchantId: inventory.owner,
            items
        }
        // add cart to database
        dispatch(addCart(cart))
        dispatch(resetItems())
        setMerchantModalVisible(false)
    }

    return (
        <View>
            <TouchableOpacity style={styles.itemContainer} onPress={() => setMerchantModalVisible(true)}>
                <Text style={styles.itemName} >{item.shopName}</Text>
                <Text style={{ marginTop: 3 }} >{item.distance}</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={merchantModalVisible}
                onRequestClose={() => {
                    setMerchantModalVisible(false)
                    resetItems()
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
        fontSize: 20
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