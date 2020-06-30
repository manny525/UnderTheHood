import React, { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import userReducer from './src/store/reducers/user'
import cartReducer from './src/store/reducers/cart'
import merchantsReducer from './src/store/reducers/merchants'
import AuthScreen from './src/screens/AuthScreen'
import MerchantNavigator from './src/navigations/MerchantNavigator';
import AsyncStorage from '@react-native-community/async-storage';
import ordersReducer from './src/store/reducers/orders';
import serviceRequestReducer from './src/store/reducers/serviceRequest';
import findUserByToken from './src/apiCalls/findUserByToken';
import cartItmesReducer from './src/store/reducers/cartItems';
import cardReducer from './src/store/reducers/card';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  merchants: merchantsReducer,
  orders: ordersReducer,
  serviceRequest: serviceRequestReducer,
  cartItems: cartItmesReducer,
  cards: cardReducer
})
const store = createStore(rootReducer)

export default function App() {
  const [tokenLoaded, setTokenLoaded] = useState(false)
  const [login, setLogin] = useState(false)
  const [userData, setUserData] = useState(null)


  async function loadToken() {
    try {
      // await AsyncStorage.clear()
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const user = await findUserByToken(token)
        await setUserData(user)
      }
    } catch (error) {
      console.log(error)
    }
    return Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
    })
  }
  if (!tokenLoaded) {
    return <AppLoading
      startAsync={loadToken}
      onFinish={() => setTokenLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }
  return (
    <Provider store={store}>
      {login ? <MerchantNavigator /> : <AuthScreen setLogin={setLogin} userData={userData} />}
    </Provider>
  )
}