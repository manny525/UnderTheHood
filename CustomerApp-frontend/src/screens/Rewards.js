import React, { Component } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';

import AppFooter from '../components/AppFooter';
import { FooterTab } from 'native-base';

export default function Rewards(){
        return(
            <View style={styles.container}>
               
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
    body:{
        flex:10,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    }
    
})