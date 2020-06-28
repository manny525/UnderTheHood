import React, { Component,useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {useSelector, useDispatch} from 'react-redux';
import AllActions from '../actions/AllActions'; 

const LoginForm=(props)=>{

    
    const [user,setUser]=useState({email:'',password:'',data:undefined})
    const [isLoaded,setLoaded]=useState(false);

    const dispatch=useDispatch();
    
    useEffect(()=>{

        async function fetchProduct() {
            const body = await JSON.stringify({
                email: user.email,
                password:user.password
            })
            
            fetch('http://192.168.43.195:3000/user/login', {
                method: "POST",
                body,
                headers: { 
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((userdata)=>{
                setUser({...user,data:userdata});
                })
            .catch(e => console.log(e)) 
          }
      
          fetchProduct();
            
    },[isLoaded])

    const validateData =async()=>{

        if(props.type == 'Login')
        {
            try{
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if ((reg.test(user.email) === false)){
                    alert('enter valid email');
                }
                else if(user.password.length<7){
                    alert('Password length should be more than 4.Try new Password');
                }
                else{

                    await setLoaded(true); //wait till user.data changes
                    if(isLoaded && user.data!==undefined)
                    {
                        console.log(user.data);
                        dispatch(AllActions.Login_Logout_Action.setUser(user.data));                        
                        Actions.home();
                    } 
                    else
                    {
                        alert('user not found');
                    }
                }
            }catch(error)
            {
                alert(error);
            }
        }
    }
    
    
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.inputBox}
                    onChangeText={(email) => setUser({...user,email:email})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Email"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#1a1f71"
                    keyboardType="email-address"
                />
                
                <TextInput 
                    style={styles.inputBox}
                    onChangeText={(password) => setUser({...user,password:password})} 
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor = "#002f6c"
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={validateData}>{props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
}



const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
    }
});

export default LoginForm