import React, { Component,useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class SignupForm extends Component {
    
    
    constructor(props){        
      super(props);        
      this.state={            
         email:'',
         password: '' ,
         Username:'',
         ContactNumber:'',
         isLoaded:false,
         data:undefined
      }   
    }

    checkExistingUser(email,password){
        //check in DB if exist pass on all parameters to home page
            return false;
    }

    async getVerificationCode(){

        const that=this;
        return new Promise(async function(resolve, reject) {           
            const body = await JSON.stringify({
                name : that.state.Username,
                contact:that.state.ContactNumber,
                email: that.state.email,
                password:that.state.password
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
                console.log(userdata);
                that.setState({data:userdata,isLoaded:true});
                resolve();
                })
            .catch(e => console.log(e))

            
        })
            
    }

    validateData =async()=>{
        const {email,password,Username,ContactNumber,data} = this.state;
    
        if(this.props.type === 'Signup')
        {
            
           const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           const phn = /^[0]?[789]\d{9}$/;

           if(Username.length<5)
           {
               alert('Minimum length should be 5')
           }
           else if(ContactNumber.length<10 || (phn.test(ContactNumber)===false))
           {
               alert('enter valid mobile number');
           }
           else if ((reg.test(this.state.email) === false)){
               alert('enter valid email');
           }
           else if(password.length<7){
               alert('Password length should be atleast 7.Try new Password')
           }
           else{
               if(this.checkExistingUser(email,password)===true)
               {
                   alert(' already registered please login');
               }
               else
               {
                    await this.getVerificationCode();   
                    if(this.state.isLoaded)
                    {
                        const userdata=this.state.data;
                        console.log(userdata);
                        if(userdata!==undefined)
                        {
                            const OTP=userdata.otp;
                            Actions.verificationCode({data:userdata,vCode:OTP,Username:Username,ContactNumber:ContactNumber,email:email,password:password});
                        }  
                    }
                             
               }
           }
        }
       
    }
    
    render() {
        return(
            <View style={styles.container}>

                <TextInput style={styles.inputBox}
                onChangeText={(Username) => this.setState({Username})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Username"
                placeholderTextColor = "#002f6c"
                selectionColor="#1a1f71"
                />

                <TextInput style={styles.inputBox}
                onChangeText={(ContactNumber) => this.setState({ContactNumber})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Enter mobile Number"
                placeholderTextColor = "#002f6c"
                selectionColor="#1a1f71"
                keyboardType='number-pad'
                maxLength={10}
                />  

                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#1a1f71"
                keyboardType="email-address"
                />
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
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