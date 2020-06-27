import React, { Component } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';

import AppFooter from '../components/AppFooter';
import { FooterTab } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../actions/AllActions';

 const Home=(props)=>{ 

    
    const dispatch=useDispatch();
    dispatch(AllActions.Login_Logout_Action.setUser(props.userData));
    const userDetails=useSelector(state=>state.loginReducer.user);
    const gettoken=useSelector(state=>state.loginReducer.token);
    const isloggedin=useSelector(state=>state.loginReducer.loggedIn);

    

        return(
            <View style={styles.container}>
                
                <View style={styles.body}>
                    <Text style={{fontSize:20}}>Body</Text>
                    <Text>{props.userData.token}</Text>
                    <Text>this is user token</Text>
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

export default Home