import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './src/screens/AuthScreen'
import Header from './src/components/Header';

export default function App() {
  const [login, setLogin] = useState(false)
  return (
    <View style={styles.container}>
      <Header title={'V2C'} />
      {!!login==false ? <AuthScreen setLogin={setLogin} /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});
