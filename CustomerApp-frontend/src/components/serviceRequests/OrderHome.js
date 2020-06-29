import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import PendingOrders from './PendingOrders';
import colors from '../../constants/colors';
import ReadyOrders from './ReadyOrders';
import CompletedOrders from './CompletedOrders';
import Header from '../Header';

const OrderHome = () => {
    const [tab, setTab] = useState(1)

    return (
        <View style={styles.screen} >
            <Header title='MY SERVICE REQUESTS' />
            <View style={styles.tabContainer} >
                <TouchableOpacity onPress={() => setTab(1)}>
                    {tab === 1 ? <Text style={styles.tabTextBold}>Upcoming</Text> : <Text style={styles.tabText}>Upcoming</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(2)}>
                    {tab === 2 ? <Text style={styles.tabTextBold}>New</Text> : <Text style={styles.tabText}>New</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(3)}>
                    {tab === 3 ? <Text style={styles.tabTextBold}>Completed</Text> : <Text style={styles.tabText}>Completed</Text>}
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }} >
                {tab === 1 && <ReadyOrders />}
                {tab === 2 && <PendingOrders />}
                {tab === 3 && <CompletedOrders />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    tabContainer: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.primary
    },
    tabText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        color: 'white'
    },
    tabTextBold: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white'
    }
})

export default OrderHome