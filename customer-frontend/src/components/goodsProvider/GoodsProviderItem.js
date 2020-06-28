import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';
import { useSelector, useDispatch } from 'react-redux';
import InventoryHome from './InventoryHome';

const GoodsProviderItem = ({ item }) => {
    const [merchantModalVisible, setMerchantModalVisible] = useState(false)

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
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setMerchantModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{item.shopName}</TitleText>
                </View>
                <Text>Inventory</Text>
                {/* <View style={styles.itemModalContainer}>
                    <InventoryHome inventory={item.inventory} />
                </View> */}
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
        alignItems: 'center'
    }
})

export default GoodsProviderItem