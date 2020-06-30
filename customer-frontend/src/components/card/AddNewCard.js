import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import addCard from '../../apiCalls/addCard';
import { addCustomerCard } from '../../store/actions/card';

export default function AddNewCard({ setCardModalVisible }) {

     const [state, setState] = useState({
          cvv: '',
          date: '',
          name: '',
          number: ''
     })

     const dispatch = useDispatch();
     const token = useSelector(state => state.user.user.token);

     const getCardVerificationStatus = () => {
          return new Promise(async function (resolve, reject) {
               var cardNumber = (state.number).split(' ').join('');
               const body = await JSON.stringify({
                    number: cardNumber,
                    date: state.date,
                    cvv: state.cvv
               })
               try {
                    const card = addCard(body, token)
                    if (card.error)
                         resolve(false);
                    else {
                         dispatch(addCustomerCard(state));
                         resolve(true);
                    }
               } catch (e) {
                    console.log(e);
                    console.log("error occured!!");
                    resolve(false);
               }
          })
     }
     const validateCard = async () => {
          var cardNumber = (state.number).split(' ').join('');

          var cardNo = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
          var date = /^(\d{4})-(\d{1,2})$/;

          if (cardNo.test(cardNumber) === false) {
               alert("Not a valid Visa credit card number!");
          }
          else if (state.name == '') {
               alert('Enter Carholder\'s name');
          }
          else if (date.test(state.date) === false) {
               alert('Enter valid expiry date');
          }
          else if ((state.cvv).length != 3) {
               alert("Enter valid cvv");
          }
          else {
               const isValid = await getCardVerificationStatus();
               if (isValid == true) {
                    alert('Card added successfully');
                    setCardModalVisible(false)
               }
               else {
                    alert('Card is not valid');
               }
          }

     }
     return (
          <View style={styles.container}>
               <ScrollView>
                    <TextInput
                         keyboardType='number-pad'
                         type="tel"
                         name="number"
                         placeholder="Card Number"
                         value={state.number}
                         maxLength={19}
                         onChangeText={(text) => setState({
                              ...state,
                              number: text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
                         })}
                         style={styles.input}
                         autoCompleteType="cc-number"
                    />
                    <TextInput
                         type="text"
                         name="name"
                         placeholder="Name on Card"
                         value={state.name}
                         onChangeText={(name) => setState({ ...state, name: name })}
                         style={styles.input}
                         autoCompleteType='username'
                    />
                    <TextInput
                         type="text"
                         name="expiry"
                         placeholder="yyyy-mm Expiry"
                         value={state.date}
                         onChangeText={(date) => setState({ ...state, date })}
                         //onFocus={e=>this.setState({focus:e.target.name})}
                         style={styles.input}
                         autoCompleteType='cc-exp'
                    />
                    <TextInput
                         type="tel"
                         name="cvv"
                         placeholder="CVV"
                         keyboardType='number-pad'
                         value={state.cvv}
                         onChangeText={(cvv) => setState({ ...state, cvv: cvv })}
                         style={styles.input}
                         autoCompleteType='cc-number'
                    />
                    <View style={{ alignItems: 'center' }}>
                         <TouchableOpacity style={styles.button}>
                              <Text style={styles.buttonText} onPress={validateCard}>Confirm</Text>
                         </TouchableOpacity>

                         <TouchableOpacity style={styles.button}>
                              <Text style={styles.buttonText} onPress={() => setCardModalVisible(false)}>Cancel</Text>
                         </TouchableOpacity>
                    </View>
               </ScrollView>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
     },
     card: {
          margin: 20
     },
     input: {
          width: 310,
          margin: 10,
          borderColor: 'grey',
          borderWidth: 1,
          borderRadius: 10,
          padding: 5,
          paddingLeft: 10
     },
     button: {
          width: 200,
          backgroundColor: '#1a1f71',
          borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 12,
          marginLeft: 20
     },
     buttonText: {
          fontSize: 16,
          fontWeight: '500',
          color: '#ffffff',
          textAlign: 'center'
     }

})
