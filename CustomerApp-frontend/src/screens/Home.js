import React, { Component } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import AppFooter from '../components/AppFooter';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../actions/AllActions';
import Header from '../components/Header';

 const Home=(props)=>{ 

    const token=useSelector(state=>state.loginReducer.token);
    const cards=useSelector(state=>state.loginReducer.Cards);
    
    return(
            <View style={styles.container}>
                <Header title='Home Page'/>
                <View style={styles.body}>
                    <Text style={{fontSize:20}}>Body</Text>
                    <Text>{cards}</Text>
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