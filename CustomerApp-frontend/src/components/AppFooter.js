import React, { Component } from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab,Button} from 'native-base';
import {Actions} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AppFooter extends Component{
    render(){
        return(
            <Footer >
                <FooterTab style={{backgroundColor:"#1a1f71"}}>
                    <Button onPress={Actions.home}>
                        <Text>
                            <Ionicons name='ios-home' size={30} color='#ffffff'/>
                        </Text>
                        <Text style={{color:'#fff'}}>Home</Text>
                    </Button>
                    <Button onPress={Actions.mycart}>
                        <Text>
                            <Ionicons name='ios-cart' size={30} color='#ffffff'/>
                        </Text>
                        <Text style={{color:'#fff'}}>MyCart</Text>
                    </Button>
                    <Button onPress={Actions.mycard}>
                        <Text>
                            <Ionicons name='ios-card' size={30} color='#ffffff'/>
                        </Text>
                        <Text style={{color:'#fff'}}>Card</Text>
                    </Button>
                    <Button onPress={Actions.rewards}>
                        <Text>
                            <Ionicons name='ios-gift' size={30} color='#ffffff'/>
                        </Text>
                        <Text style={{color:'#fff'}}>Rewards</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}