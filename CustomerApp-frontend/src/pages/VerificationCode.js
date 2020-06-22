import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard ,Alert} from 'react-native';
import Form from '../components/LoginForm';
import { Actions } from 'react-native-router-flux';

export default class VerificationCode extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {  
            vCode:'',
            data:{
                code:''
            }
        } ;
    }
     
      getVerificationCode(){
            // setError('')
            // const body = await JSON.stringify({
            //     email: this.props.email,
            //     password:this.props.password,
                //  ContactNumber:this.props.ContactNumber,
                //  username : this.props.Username
            // })
            // fetch('http://192.168.1.6:3000/users/newUser', {
            //     method: "POST",
            //     body,
            //     headers: { 
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then(res => res.json())
            // .then((userData) => {this.setState({data:userData})})
            // .catch(e => console.log(e))
            
            this.setState({data:{code:'1234'}});
    }

    validateCode=()=>{

        this.setState({data:{code:'1234'}});

       const {vCode,data}=this.state;
       console.log(vCode);
       console.log(data.code);
       
       if(vCode===data.verificationcode)
       {
           alert('Successful');
           Actions.home({data:data});
       }
       else{
           alert('Enter correct code');
       }
    }
    render() {
        return(
            <View style={styles.container}>
                
                <View style={styles.appNameCont}>
                    <Text style={styles.appName}>Customer App</Text>
                </View>

                <TextInput style={styles.inputBox}
                onChangeText={(vCode)=>{this.setState({vCode:vCode})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Verification Code"
                placeholderTextColor = "#002f6c"
                keyboardType='number-pad'
                />
    
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.validateCode}>Verify</Text>
                </TouchableOpacity>
            </View>
            
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
