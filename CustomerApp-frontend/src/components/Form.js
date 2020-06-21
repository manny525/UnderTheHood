import React, { Component,useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class Form extends Component {
    constructor(props){        
      super(props);        
      this.state={            
         email:'',
         password: ''        
      }   
    }
    checkExistingUser(email,password){
        //check in DB
            return true;
    }

    validateData =async()=>{
        const {email,password} = this.state;
    
        //save data with asyncstorage
        let loginDetails={
            email: email,
            password: password
        }
        

        if(this.props.type === 'Signup')
        {
            
           const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           if ((reg.test(this.state.email) === false)){
               alert('enter valid email');
           }
           else if(password.length<5){
               alert('Password length should be more than 4.Try new Password')
           }
           else{
               if(this.checkExistingUser(email,password)===true)
               {
                   alert(' already registered please login');
               }
               else
               {
                  Actions.verificationCode({email:email,password:password});
               }
           }
        }
        else if(this.props.type == 'Login')
        {
            try{
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if ((reg.test(this.state.email) === false)){
                    alert('enter valid email');
                }
                else if(password.length<5){
                    alert('Password length should be more than 4.Try new Password');
                }
                else{
                    if(this.checkExistingUser(email,password)=== false)
                    {
                        alert('user not found')
                    }
                    else
                    {
                        Actions.home();
                    }
                }
            }catch(error)
            {
                alert(error);
            }
        }
    }
    
    render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                type='e'
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#1a1f71"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.validateData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
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