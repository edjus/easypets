import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import { Rating, AirbnbRating } from 'react-native-ratings';
import DogWalkerProfile from './DogWalkerProfile'
import {DogWalkerData} from './DogWalkerData'

import Header from '../components/Header';
function Item ({item, callBack}){
  
    return (
      <View style={styles.listItem}>
        <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.distance + " km" + "  " + item.price + " /hr"} </Text>
          <AirbnbRating defaultRating={item.rating} size={20}/>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>callBack(item)}>
          <Text style={{color:"green"}} >Hire</Text>
        </TouchableOpacity>
      </View>
    );
  }


export default class DogWalkers extends React.Component {
 
    state = {
        data:DogWalkerData, 
        renderProfile:false,
        selectedWalker:{}
      }
 



  goToDogWalkerProfile=(item)=> {
     
    // return (
    //   <DogWalkerProfile data={item}></DogWalkerProfile>
    // )
    console.log("item clicked" , item)
    this.setState({selectedWalker:item, renderProfile:true})
    //this.props.navigation.navigate('DogWalker',{data:item});
  }
  render(){
    if(!this.state.renderProfile){
    return (
      
      <View style={styles.container}>
       <Header name="DogWalkers" openDrawer={this.props.navigation.openDrawer}/>
 
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item}) => <Item item={item} callBack={this.goToDogWalkerProfile}/>}
          keyExtractor={item => item.email}
        />
        
        
      </View>
    );
      }else{
        return(
          <DogWalkerProfile data={this.state.selectedWalker} navigation={this.props.navigation} parentScreen={"DogWalkers"}/> 

        )
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:60
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  }
});
