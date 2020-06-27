import React, { Component } from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';

import AppFooter from '../components/AppFooter';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import { useSelector, useDispatch } from 'react-redux';
import AllActions from '../actions/AllActions';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MyCard(){

        const cards=useSelector(state=>state.cardReducer.cardList);
        const dispatch=useDispatch();

        console.log(cards);

        const myCards=cards.map(item=>{
            return (
                <View style={styles.cardsLayout} key={item.number}>
                    
                    <View style={{flexDirection:'row'}}>
                        <View style={{marginRight:10,marginTop:2}}>
                            <Text>
                                <Icon name="credit-card" size={15}  />
                            </Text>
                        </View>
                        <View>
                            <Text>{item.number}</Text>
                            <Text>{item.name}</Text>
                        </View>
                        
                    </View>
                    <View>
                        <TouchableOpacity  onPress={()=>dispatch(AllActions.CardActions.deleteCard(item.number))}>
                                {/* <Text style={{color:'#fff'}}>delete</Text> */}
                                <Text>
                                <Icon name="remove" size={30} color="#900" />
                                </Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </View>
            )
        })

        return(
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        
                        <View style={styles.cards}>
                            {myCards}
                            {/* <FlatList style={styles.listContainer}
                                data={this.props.foods}
                                keyExtractor={(item, index) => item.key.toString()}
                                renderItem={
                                (data) =>
                                    <ListItem
                                    title={data.item.name}
                                    bottomDivider
                                    rightIcon={<Icon
                                        name='delete'
                                        size={36}
                                        onPress={() => this.props.delete(data.item.key)} />
                                    }
                             /> */}

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
        padding:10,
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