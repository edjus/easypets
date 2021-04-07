import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import { Rating, AirbnbRating } from 'react-native-ratings';
import DogWalkerProfile from './DogWalkerProfile'
import {DogWalkerData} from './DogWalkerData'
import Map from './Map'


function Item ({item, dias ,callBack}){
    return (
      <View style={styles.listItem}>
        <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.distance + "m" + "  " + item.price + " $/hr"} </Text>
          <AirbnbRating defaultRating={item.rating} size={20}/>
          <View style={{alignItems:"center",flex:1,flexDirection:"row"}}>
                      <Text style={{fontWeight:"bold" ,marginRight:10}}>Day and hour: </Text>
                      <Text style={{fontWeight:"bold"}}>{dias}</Text>
            </View>
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>callBack(item)}>
          <Text style={{color:"green"}} >Cancel Hire</Text>
        </TouchableOpacity>
      </View>
    );
  }

let hiredDogWalkers=[]
export default class DogWalkers extends React.Component {
 
    state = {
        data:[], 
        reservedDays:'',
        renderProfile:false,
        selectedWalker:{},
        renderMap:false
      }
 
  componentDidMount(){
    hiredDogWalkers=[]
    hiredDogWalkers.push(this.props.data)
  
      let date= new Date();
      // date.setHours(date.getHours() +  Math.round(date.getMinutes()/60));
      // date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
      date.setMinutes(date.getMinutes() +  20);
      var stringDate=date.toString().split('G')[0]
      this.setState({data:hiredDogWalkers , reservedDays:stringDate})
  
 
  }

  goBack=(item)=> {
     
   
 
    this.setState({ renderMap:true})
    
  }
  cancelHire=(item)=>{
    let  newData=this.state.data.filter((value)=>{value.email!=item.email})
    
    this.setState({data:newData})
  }
  render(){
    if ((!this.state.renderMap)){
            
      
    return (
      <View style={styles.container}>
      <Text style={{fontWeight:"bold", fontSize:20, textAlign:'center', color:'red'}}>Spot Hired Dog walkers</Text>
      
      {!this.state.renderProfile ?
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item}) => <Item item={item}  dias={this.state.reservedDays} callBack={this.cancelHire}/>}
          keyExtractor={item => item.email}
        />:
        <DogWalkerProfile data={this.state.selectedWalker} navigation={this.props.navigation} parentScreen={"DogWalkers"}/> 
        }
        <TouchableOpacity  onPress={()=>this.goBack()}>
        <Image style={styles.roundButton3} source={require('../../assets/back.png')}/>
                </TouchableOpacity>

      </View>
    );
  }else{

    return(
        <Map navigation={this.props.navigation}/> 
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
  },
  roundButton3: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    padding: 0,
    marginTop:5,
    marginBottom:50,
  
    borderRadius: 100,
    backgroundColor: 'blue',
  },
});
