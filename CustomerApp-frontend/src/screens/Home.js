import React, { Component } from 'react';
import {Text,StyleSheet, View} from 'react-native';
import AppFooter from '../components/AppFooter';

export default class Home extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Home Page</Text>
                <AppFooter/>
            </View>           
        )
    }
}

const styles=StyleSheet.create({
    container:{
        marginTop:90,
        justifyContent:'center',
        alignItems:'center'
    }
})