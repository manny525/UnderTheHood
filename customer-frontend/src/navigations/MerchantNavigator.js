import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import colors from '../constants/colors';
import CartsScreen from '../screens/CartsScreen';
import RequestsScreen from '../screens/RequestsScreen';

const Tab = createBottomTabNavigator()

const MerchantNavigator = () => {

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'ios-home'
                        } 
                        else if (route.name === 'Cards') {
                            iconName= 'ios-card'
                        } else if (route.name === 'Carts') {
                            iconName = 'ios-cart';
                        } else if (route.name === 'Orders') {
                            iconName = 'ios-paper';
                        } else if (route.name === 'Service') {
                            iconName = 'ios-build'
                        }
                        return <Ionicons name={iconName} size={size} color={!focused ? colors.opaque : colors.primary} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: colors.opaque,
                    activeBackgroundColor: colors.opaque,
                    inactiveBackgroundColor: colors.primary,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    name="Carts"
                    component={CartsScreen}
                />
                <Tab.Screen
                    name="Orders"
                    component={OrdersScreen}
                />
                <Tab.Screen
                    name="Service"
                    component={RequestsScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MerchantNavigator