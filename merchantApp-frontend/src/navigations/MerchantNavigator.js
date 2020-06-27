import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InventoryScreen from '../screens/InventoryScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import colors from '../constants/colors';
import GoodsProviderHome from '../components/goodsProvider/GoodsProviderHome';
import Orders from '../screens/Orders';
import ServiceProviderHome from '../components/serviceProvider/ServiceProviderHome';

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
                        } else if (route.name === 'Inventory') {
                            iconName = 'ios-menu';
                        } else if (route.name === 'Orders') {
                            iconName = 'ios-paper';
                        }
                        return <Ionicons name={iconName} size={size} color={!focused ? colors.opaque : colors.primary} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.primary,
                    inactiveTintColor: colors.opaque,
                    activeBackgroundColor: colors.opaque,
                    inactiveBackgroundColor: colors.primary 
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Tab.Screen
                    name="Inventory"
                    component={InventoryScreen}
                />
                <Tab.Screen
                    name="Orders"
                    component={OrdersScreen}
                />
                <Tab.Screen
                    name="Merchants"
                    component={ServiceProviderHome}
                />
                <Tab.Screen
                    name="Carts"
                    component={Orders}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MerchantNavigator