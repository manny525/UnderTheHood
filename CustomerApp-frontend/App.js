import React from 'react';
import { StyleSheet,View,StatusBar} from 'react-native';
import Routes from './src/routes/Routes';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import RootReducer from './src/reducer/RootReducer';


const store=createStore(RootReducer);

export default function App() {

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#faaa13" 
            barStyle="light-content"
          />
          <Routes/>
        </View>
      </Provider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

