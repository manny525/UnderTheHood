import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors'
import InventoryItems from './InventoryItems';

const InventoryList = ({ item }) => {
    const [imgSrc, setImgSrc] = useState(require('../../../assets/dropdown.png'))
    const [openList, setOpenList] = useState(false)
    return (
        <View>
            <TouchableOpacity activeOpacity = {0.4} onPress={() => {
                if (openList) {
                    setImgSrc(require('../../../assets/dropdown.png'))
                }
                else {
                    setImgSrc(require('../../../assets/dropup.png'))
                }
                setOpenList(!openList)
            }}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category} >{item.category}</Text>
                    <Image style={styles.tinyLogo} source={imgSrc} />
                </View>
            </TouchableOpacity>
            {openList && <InventoryItems items={item.list} category={item.category} />}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        marginVertical: 5,
        width: Dimensions.get('window').width * 0.8
    },
    category: {
        fontFamily: 'open-sans',
        fontSize: 20,
        color: 'white'
    },
    tinyLogo: {
        marginTop: 5,
        marginRight: 5,
        height: 20,
        width: 20
    }
})

export default InventoryList