import React, { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import userReducer from './src/store/reducers/user'
import inventoryReducer from './src/store/reducers/inventory'
import AuthScreen from './src/screens/AuthScreen'
import MerchantNavigator from './src/navigations/MerchantNavigator';
import AsyncStorage from '@react-native-community/async-storage'
import getUserFromToken from './src/apiCalls/getUserFromToken';
import ordersReducer from './src/store/reducers/orders';

const rootReducer = combineReducers({
  user: userReducer,
  inventory: inventoryReducer,
  orders: ordersReducer
})
const store = createStore(rootReducer)

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false)
  const [tokenLoaded, setTokenLoaded] = useState(false)
  const [login, setLogin] = useState(false)
  const [userData, setUserData] = useState(null)

  async function loadToken() {
    try {
      // await AsyncStorage.clear()
      const token = await AsyncStorage.getItem('token');
      const _id = await AsyncStorage.getItem('owner');
      if (token !== null) {
        const body = await JSON.stringify({
          _id,
          token
        })
        const user = await getUserFromToken(body)
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
