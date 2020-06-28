import React, {  } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import AppFooter from '../components/AppFooter';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../actions/AllActions';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function MyCard(){

        const cards=useSelector(state=>state.cardReducer.cardList);
        const dispatch=useDispatch();
        
        console.log(cards);

        const myCards=cards.map(item=>{
            return (
                <View style={styles.cardsLayout} key={item.number}>
                    
                        <View>
                            <Text>{item.number}</Text>
                            <Text>{item.name}</Text>
                            <Text>Valid till: {item.expiry}</Text>
                        </View>
                        
                    
                    <View>
                        <TouchableOpacity  onPress={()=>dispatch(AllActions.CardActions.deleteCard(item.number))}>
                                <Text>
                                    <Ionicons name="ios-trash" size={32}/>
                                </Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
            )
        })

        return(
            <View style={styles.container}>
                <Header title='My Cards'/>
                <ScrollView>
                    <View style={styles.body}>
                        
                        <View style={styles.cards}>
                            {myCards}    
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button}>
                                <Text onPress={Actions.addnewcard} style={styles.buttonText}>Add Cards</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <AppFooter/>
                </View>
            </View>            
        )
    }


const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        flex:1  
    },
    body:{
        flex:10,
        backgroundColor:'#fff'
    },    
    title:{
        fontSize:20,
        marginVertical:20,
        padding:10
    },
    cardsLayout:{
        margin:5,
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#D4CFCF',
        paddingVertical:20,
        borderRadius:10,
        borderColor:'black',
        borderWidth:1
    },
    deleteButton:{
        backgroundColor:'#525252',
        padding:5,
        borderRadius:10,
        paddingHorizontal:10

    },
    cards:{
        padding:10,
        backgroundColor:'#fff'
    },
    buttonView:{
        alignItems:'center'
    },
    button: {
        width: 200,
        backgroundColor: '#1a1f71',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    listContainer: {
        backgroundColor: '#dce2ff',
        padding: 16
    },
      listText: {
        fontSize: 30
      }
    
})