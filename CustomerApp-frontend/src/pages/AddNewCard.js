import React, { Component, useState } from 'react';
import CreditCard from 'react-native-credit-card';
import {StyleSheet,TouchableOpacity,Text} from 'react-native';
import { View } from 'native-base';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import {useSelector,useDispatch} from 'react-redux';
import AllActions from '../actions/AllActions';

export default function AddNewCard(){

     const [state,setState]=useState({
          cvc: '',
          expiry: '',
          name: '',
          number: ''
     })
    
     const dispatch=useDispatch();
     const token=useSelector(state=>state.loginReducer.token);
     
     const getCardVerificationStatus=()=>{
          
          return new Promise(async function(resolve, reject) {
               var cardNumber=(state.number).split(' ').join('');
               const body = await JSON.stringify({
                    number : cardNumber,
                    date:state.expiry,
                    cvv: state.cvc
                })
                fetch('http://192.168.43.195:3000/add/card', {
                    method: "POST",
                    body,
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => res.json())
                .then((userdata)=>{
                    console.log(userdata);
                    if(userdata.error)
                         resolve(false);
                    else{
                         dispatch(AllActions.CardActions.addCard(state));
                         resolve(true);
                    }
                })
                .catch(e => {
                     console.log(e);
                     console.log("error occured!!");
                     resolve(false);
                })
               
          })
          
     }
     validateCard=async()=>{
          
          
          var cardNumber=(state.number).split(' ').join('');
          
          var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
          var date=/^(\d{4})-(\d{1,2})$/;
          
          if(cardno.test(cardNumber)===false)
          {
               alert("Not a valid Visa credit card number!");
          }
          else if(state.name=='')
          {
               alert('Enter Carholder\'s name');
          }
          else if(date.test(state.expiry)===false)
          {
               alert('Enter valid expiry date');
          }
          else if((state.cvc).length!=3)
          {
               alert("Enter valid cvc");
          }
          else
          {
               const isValid=await getCardVerificationStatus();
               if(isValid==true) 
               {
                    alert('card added successfully');                                    
               }
               else{
                    alert('Card is not valid');
               }
          }
          
     }
                
        return(
            
          <View style={styles.container}>
          <ScrollView>
               
          <TextInput
             keyboardType='number-pad'
             type="tel"
             name="number"
             placeholder="Card Number"
             value={state.number}
             maxLength={19}
             onChangeText={(text) => setState({...state,
               number: text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()})}
             style={styles.input}
             autoCompleteType="cc-number"
          />
          <TextInput
             type="text"
             name="name"
             placeholder="name"
             value={state.name}
             onChangeText={(name)=>setState({...state,name:name})}
             style={styles.input}
             autoCompleteType='username'
          />
          <TextInput
             type="text"
             name="expiry"
             placeholder="yyyy-mm Expiry"
             value={state.expiry}
             onChangeText={(expiry)=>setState({...state,expiry:expiry})}
             //onFocus={e=>this.setState({focus:e.target.name})}
             style={styles.input}
             autoCompleteType='cc-exp'
          />
          <TextInput
             type="tel"
             name="cvc"
             placeholder="CVV "
             keyboardType='number-pad'
             value={state.cvc}
             onChangeText={(cvc)=>setState({...state,cvc:cvc})}
             style={styles.input}
             autoCompleteType='cc-number'
          />
          <View style={{alignItems:'center'}}>
               <TouchableOpacity style={styles.button}>
                    <Text  style={styles.buttonText} onPress={validateCard}>Confirm</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.button}>
                    <Text  style={styles.buttonText} onPress={Actions.mycard}>Cancel</Text>
               </TouchableOpacity>

          </View>
          </ScrollView>
          </View>

        )
    }

const styles=StyleSheet.create({
     container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
     },
     card:{
          margin:20
     },
     input:{
          width:310,
          margin :10,
          borderColor:'grey',
          borderWidth:1,
          borderRadius:10,
          padding:5,
          paddingLeft:10
     },
     button: {
         width: 200,
         backgroundColor: '#1a1f71',
         borderRadius: 25,
         marginVertical: 10,
         paddingVertical: 12,
         marginLeft:20
     },
     buttonText: {
         fontSize: 16,
         fontWeight: '500',
         color: '#ffffff',
         textAlign: 'center'
     }

})
