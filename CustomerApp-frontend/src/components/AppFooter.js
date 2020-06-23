import React, { Component } from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab,Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import { color } from 'react-native-reanimated';

export default class AppFooter extends Component{
    render(){
        return(
            <Footer>
                <FooterTab>
                    <Button onPress={Actions.home}>
                        <Text style={{color:'#1a1f71'}}>Home</Text>
                    </Button>
                    <Button onPress={Actions.mycart}>
                        <Text style={{color:'#1a1f71'}}>MyCart</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}