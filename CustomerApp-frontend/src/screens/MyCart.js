import React, { Component } from 'react';
import {Text,StyleSheet} from 'react-native';
import {Content} from 'native-base';
import AppFooter from '../components/AppFooter'

export default class MyCart extends Component{
    render(){
        return(
            <Content style={styles.container}>
                <Text>MY CART</Text>
                <AppFooter/>
            </Content>            
        )
    }
}

const styles=StyleSheet.create({
    container:{
        marginTop:90
    }
})