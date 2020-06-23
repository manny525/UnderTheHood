import React, { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import userReducer from './src/store/reducers/user'
import AuthScreen from './src/screens/AuthScreen'
import MerchantNavigator from './src/navigations/MerchantNavigator';
import { setUser } from './src/store/actions/user';

const rootReducer = combineReducers({
  user: userReducer
})

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf')
  })
}

const store = createStore(rootReducer)

export default function App() {
  const [login, setLogin] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }

  return (
    <Provider store={store}>
      {login ? <MerchantNavigator /> : <AuthScreen setLogin={setLogin} />}
    </Provider>
  );
}
