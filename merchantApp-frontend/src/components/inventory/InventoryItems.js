import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, TouchableOpacity, Modal, Dimensions, Image } from 'react-native';
import InventoryItem from './InventoryItem';
import Header from '../Header';
import TitleText from '../TitleText';
import colors from '../../constants/colors';

const InventoryItems = ({ items, category }) => {
    const [addItemModalVisible, setAddItemModalVisible] = useState(false)
    const [databaseItems, setDatabaseItems] = useState([])
    return (
        <View style={styles.itemsContainer} >
            <FlatList
                data={items}
                renderItem={({ item }) => {
                    return (
                        <InventoryItem item={item} />
                    )
                }}
                keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addItem} onPress={() => setAddItemModalVisible(true)} >
                <Text>Add item</Text>
                <Text>+</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={addItemModalVisible}
                onRequestClose={() => {
                    setAddItemModalVisible(false)
                }}
            >
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setAddItemModalVisible(false)} style={styles.modalHeader} >
                        <Image source={require('../../../assets/dropdown.png')} style={styles.tinyLogo} />
                    </TouchableOpacity>
                    <TitleText>Category: {category}</TitleText>
                </View>
                <FlatList
                    data={items}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemsContainer}>
                                <InventoryItem item={item} addItem={true} />
                            </View>
                        )
                    }}
                    keyExtractor={item => item.id}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    itemsContainer: {
        marginTop: 5,
        flex: 1,
        width: '80%',
        marginLeft: 30,
        alignItems: 'stretch'
    },
    addItem: {
        marginTop: 10,
        width: '50%',
        marginLeft: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    }
})

export default InventoryItems