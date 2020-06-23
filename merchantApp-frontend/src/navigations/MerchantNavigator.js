import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import InventoryScreen from '../screens/InventoryScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator()

const MerchantNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        header: () => {
                            return <Header title="MERCHANT APP" />
                        }
                    }}
                />
                <Stack.Screen
                    name="Inventory"
                    component={InventoryScreen}
                    options={{
                        header: () => {
                            return <Header title="INVENTORY" />
                        }
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MerchantNavigator