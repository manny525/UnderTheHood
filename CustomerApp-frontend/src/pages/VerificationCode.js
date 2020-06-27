import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard ,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { useDispatch, useSelector } from 'react-redux';
import AllActions from '../actions/AllActions';

const VerificationCode=(props)=>{
    
    
    const [vCode,setVcode]=useState('');
    
    const validateCode=()=>{

        if(vCode===props.vCode)
        {
            alert('Successful');
            Actions.home({userData:props.userData});
        }
        else{
            alert('Enter correct code');
        }
    }

    
        return(
            <View style={styles.container}>
                
                <View style={styles.appNameCont}>
                    <Text style={styles.appName}>Customer App</Text>
                </View>

                <TextInput style={styles.inputBox}
                onChangeText={(vCode)=>setVcode(vCode)}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Verification Code"
                placeholderTextColor = "#002f6c"
                keyboardType='number-pad'
                />
    
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={validateCode}>Verify</Text>
                </TouchableOpacity>
            </View>  
        )
    

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    inputBox: {
        width: 300,
        height:45,
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1a1f71',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    appNameCont: {
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

export default VerificationCode