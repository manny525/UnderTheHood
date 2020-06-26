import React, { Component,useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class ViewLoyalty extends Component {

    constructor(props){        
        super(props);        
        this.state={            
           points:[],
           customer: [],
           merchant:[],
           promocode:[]
        }   
      }
    
    showPoints=async()=>{
        const body = await JSON.stringify({
            points : that.state.points,
            customer:that.state.customer,
            merchant: that.state.merchant,
            promocode:that.state.promocode
        })
        fetch('http://192.168.43.195:3000/loyalty', {
            method: "POST",
            body,
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((loyalty)=>{
            console.log(loyalty);
            that.setState({data:loyalty,isLoaded:true});
            resolve();
            })
        .catch(e => console.log(e))
    }

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.showPoints}>Display Points</Text>
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