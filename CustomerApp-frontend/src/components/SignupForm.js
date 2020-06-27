import React, { Component,useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AllAction from '../actions/AllActions';
import { useDispatch } from 'react-redux';

const SignupForm=(props)=>{   
    
    const [user,setUser]=useState({
        email:'',
        password:'',
        username:'',
        contactNumber:'',
        data:undefined
    })
    const [isLoaded,setLoaded]=useState(false);

    const dispatch=useDispatch();

    const checkExistingUser=(email,password)=>{
        //check in DB if exist pass on all parameters to home page
            return false;
    }

    useEffect(()=>{

        async function fetchProduct() {
            const body = await JSON.stringify({
                name : user.username,
                contact:user.contactNumber,
                email: user.email,
                password:user.password
            })
            
            fetch('http://192.168.43.195:3000/register/user', {
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

    validateData =async()=>{

        if(props.type === 'Signup')
        {
            
           const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           const phn = /^[0]?[789]\d{9}$/;

           if(user.username.length<5)
           {
               alert('Minimum length should be 5')
           }
           else if(user.contactNumber.length<10 || (phn.test(user.contactNumber)===false))
           {
               alert('enter valid mobile number');
           }
           else if ((reg.test(user.email) === false)){
               alert('enter valid email');
           }
           else if(user.password.length<7){
               alert('Password length should be atleast 7.Try new Password')
           }
           else{
               if(checkExistingUser(user.email,user.password)===true)
               {
                   alert(' already registered please login');
               }
               else
               {
                    await setLoaded(true);     //wait here till user.data gets changed               
                    if(isLoaded && user.data!==undefined)
                    {
                        
                        console.log(user.data);

                        const OTP=user.data.otp;
                        
                        const loginDetails={
                            token:user.data.token,
                            user:user.data.user
                        };
                        console.log(loginDetails);
                        Actions.verificationCode({vCode:OTP,userData:loginDetails});
                    } 
                             
               }
           }
        }
       
    }
    
    
        return(
            <View style={styles.container}>

                <TextInput 
                    style={styles.inputBox}
                    onChangeText={(Username) => setUser({...user,username:Username})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Username"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#1a1f71"
                />

                <TextInput 
                    style={styles.inputBox}
                    onChangeText={(ContactNumber) => setUser({...user,contactNumber:ContactNumber})}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    placeholder="Enter mobile Number"
                    placeholderTextColor = "#002f6c"
                    selectionColor="#1a1f71"
                    keyboardType='number-pad'
                    maxLength={10}
                />  

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

export default SignupForm