import React, { Component } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';

import AppFooter from '../components/AppFooter';
import { FooterTab } from 'native-base';

export default function MyCart(){
        return(
            <View style={styles.container}>
                {/* <View style={styles.header}>
                    <Text style={{color:'#fff',fontSize:20,paddingLeft:20,paddingTop:20}}>My Cart</Text>
                </View> */}
                <View style={styles.body}>
                    <Text style={{fontSize:20}}>Body</Text>
                </View>
                <View style={styles.footer}>
                    <AppFooter/>
                </View>
            </View>            
        )
    }


const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1,
        backgroundColor:'yellow'  
    },
    header:{
        flex:1.3, 
        backgroundColor:'#fdbb0a',
        justifyContent:'center',
        padding:5
    },
    body:{
        flex:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    
})