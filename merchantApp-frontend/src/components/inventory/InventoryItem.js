import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, Image, Dimensions, TextInput } from 'react-native';
import colors from '../../constants/colors';
import TitleText from '../TitleText';
import inputStyle from '../../styles/input'
import MainButton from '../MainButton';

const InventoryItem = ({ item, addItem }) => {
    const [itemModalVisible, setItemModalVisible] = useState(false)
    const [itemName, setItemName] = useState(item.item)
    const [available, setAvailable] = useState(item.available)
    const [sellingPrice, setSellingPrice] = useState(item.sellingPrice)

    const toggleAvailability = async () => {
        //set in database
        item.available = !available
        await setAvailable(!available)
    }
    return (
        <View style={styles.itemContainer} >
            <TouchableOpacity onPress={() => setItemModalVisible(true)} >
                <Text style={styles.itemName} >{item.item}</Text>
            </TouchableOpacity>
            {addItem ?
                <TouchableOpacity onPress={() => setItemModalVisible(true)} >
                    <Text style={styles.itemName} >+</Text>
                </TouchableOpacity> : <Switch
                    trackColor={{ true: colors.primary, false: colors.opaque }}
                    thumbColor={"#f4f3f4"}
                    onValueChange={toggleAvailability}
                    value={available}
                />}
            <Modal
                animationType="slide"
                visible={itemModalVisible}
                onRequestClose={() => {
                    setItemModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setItemModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>{item.item}</TitleText>
                </View>
                <View style={styles.itemModalContainer}>
                    <Text style={styles.itemName} >Item Name</Text>
                    <TextInput
                        style={{ ...inputStyle.input, marginTop: 2 }}
                        placeholder='Item Name'
                        onChangeText={(text) => { setItemName(text) }}
                        value={itemName}
                    />
                    <Text style={styles.itemName}>Selling Price</Text>
                    <TextInput
                        keyboardType='number-pad'
                        style={{ ...inputStyle.input, marginTop: 2 }}
                        placeholder='Item Name'
                        onChangeText={(text) => { setSellingPrice(text) }}
                        value={sellingPrice}
                    />
                    <Text style={styles.itemName}>Available</Text>
                    <Switch
                        trackColor={{ true: colors.primary, false: colors.opaque }}
                        thumbColor={"#f4f3f4"}
                        onValueChange={toggleAvailability}
                        value={available}
                    />
                    { !addItem && 
                        <MainButton 
                            style={{ backgroundColor: colors.secondary, marginTop: 5 }}
                        >
                            Delete
                        </MainButton> }
                    <MainButton style={{ marginTop: 5 }} >{addItem ? 'Add' : 'Edit'}</MainButton>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default InventoryItem