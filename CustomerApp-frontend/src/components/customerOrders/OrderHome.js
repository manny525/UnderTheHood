import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import PendingOrders from './PendingOrders';
import colors from '../../constants/colors';
import ReadyOrders from './ReadyOrders';
import CompletedOrders from './CompletedOrders';
import Header from '../Header';
import PaidOrders from './PaidOrders';

const OrderHome = () => {
    const [tab, setTab] = useState(2)

    return (
        <View style={styles.screen} >
            <View style={styles.tabContainer} >
                <TouchableOpacity onPress={() => setTab(1)}>
                    {tab === 1 ? <Text style={styles.tabTextBold}>Pending</Text> : <Text style={styles.tabText}>Pending</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(2)}>
                    {tab === 2 ? <Text style={styles.tabTextBold}>Ready</Text> : <Text style={styles.tabText}>Ready</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(3)}>
                    {tab === 3 ? <Text style={styles.tabTextBold}>Paid</Text> : <Text style={styles.tabText}>Paid</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab(4)}>
                    {tab === 4 ? <Text style={styles.tabTextBold}>Completed</Text> : <Text style={styles.tabText}>Completed</Text>}
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }} >
                {tab === 1 && <PendingOrders setTab={setTab} />}
                {tab === 2 && <ReadyOrders setTab={setTab} />}
                {tab === 3 && <CompletedOrders setTab={setTab} />}
                {tab === 4 && <PaidOrders setTab={setTab} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    tabContainer: {
        width: Dimensions.get('window').width,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.primary
    },
    tabText: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: 'white'
    },
    tabTextBold: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: 'white'
    }
})

export default OrderHome