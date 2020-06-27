import React, { Component } from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab,Button} from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class AppFooter extends Component{
    render(){
        return(
            <Footer >
                <FooterTab style={{backgroundColor:"#1a1f71"}}>
                    <Button onPress={Actions.home}>
                        <Text style={{color:'#fff'}}>Home</Text>
                    </Button>
                    <Button onPress={Actions.mycart}>
                        <Text style={{color:'#fff'}}>MyCart</Text>
                    </Button>
                    <Button onPress={Actions.mycard}>
                        <Text style={{color:'#fff'}}>Card</Text>
                    </Button>
                    <Button onPress={Actions.rewards}>
                        <Text style={{color:'#fff'}}>Rewards</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}