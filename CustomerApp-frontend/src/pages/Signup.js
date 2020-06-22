import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SignupForm from '../components/SignupForm';
import { Actions } from 'react-native-router-flux';

export default class Signup extends Component {

    signin() {
        Actions.login();
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={()=>{
                Keyboard.dismiss();
            }}>
            <View style={styles.container}>
                
                <View style={styles.appNameCont}>
                    <Text style={styles.appName}>Customer App</Text>
                </View>
                <SignupForm type='Signup'/>
                <View style={styles.signinTextCont}> 
                    <Text style={styles.signinText}>Already have an account? </Text>
                    <TouchableOpacity onPress={this.signin}><Text style={styles.signinButton}>Sign in</Text></TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    signinTextCont: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingVertical: 16,
      flexDirection: 'row'
    },
    signinText: {
      color: '#1a1f71', 
      fontSize:16,
    },
    signinButton: {
        color: '#1a1f71',
        fontSize:16,
        fontWeight: '500',
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




