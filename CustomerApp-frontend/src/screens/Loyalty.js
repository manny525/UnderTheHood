import React, { Component } from 'react';
import {Text,StyleSheet} from 'react-native';
import {Content} from 'native-base';
import ViewLoyalty from '../components/ViewLoyalty'

export default class Loyalty extends Component{
    render(){
        return(
            <Content style={styles.container}>
                <Text>MY LOYALTY POINTS</Text>
                <ViewLoyalty/>
            </Content>            
        )
    }
}

const styles=StyleSheet.create({
    container:{
        marginTop:90
    }
})