import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import Form from '../components/Form';
import { Actions } from 'react-native-router-flux';


export default class Login extends Component {

    signup() {
        Actions.signup();
    }

    render() {
        return(
                <View style={styles.container}>
                <View style={styles.appNameCont}>
                    <Text style={styles.appName}>Customer App</Text>
                </View>
                <Form type="Login"/>
                <View style={styles.signupTextCont}> 
                    <Text style={styles.signupText}>Dont have an account yet? </Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}>Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    signupTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signupText: {
      color: '#1a1f71', 
      fontSize:16
    },
    signupButton: {
        color: '#1a1f71',
        fontSize:16,
        fontWeight: '500'
    },
    appNameCont: {
        marginTop:60,
        marginBottom: 90,
        paddingVertical: 12
    },
    appName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#1a1f71',
        textAlign: 'center'
    }
});
