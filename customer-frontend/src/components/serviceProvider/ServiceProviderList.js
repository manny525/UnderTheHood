import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../constants/colors';
import ServiceProviderItems from './ServiceProviderItems';

const ServiceProviderList = ({ category }) => {
    const [imgSrc, setImgSrc] = useState(require('../../../assets/dropdown.png'))
    const [openList, setOpenList] = useState(false)
    return (
        <View>
            <TouchableOpacity activeOpacity={0.4} onPress={() => {
                if (openList) {
                    setImgSrc(require('../../../assets/dropdown.png'))
                }
                else {
                    setImgSrc(require('../../../assets/dropup.png'))
                }
                setOpenList(!openList)
            }}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category} >{category.type.toUpperCase()}</Text>
                    <Image style={styles.tinyLogo} source={imgSrc} />
                </View>
            </TouchableOpacity>
            {openList &&
                <ServiceProviderItems items={category.merchants} />
            }
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
        fontSize: 16,
        color: 'white'
    },
    tinyLogo: {
        marginTop: 5,
        marginRight: 5,
        height: 16,
        width: 16
    },
    header2: {
        width: Dimensions.get('window').width,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        fontSize: 18
    }
})

export default ServiceProviderList