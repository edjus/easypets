import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';

import { Rating, AirbnbRating } from 'react-native-ratings';
import DogWalkerProfile from './DogWalkerProfile'
import {DogWalkerData} from './DogWalkerData'


function Item ({item, dias ,callBack, cancel}){
  console.log("dias recibidos: ",dias)
    return (
      <View style={styles.listItem}>
        <Image source={{uri:item.photo}}  style={{width:60, height:60,borderRadius:30}} />
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.name}</Text>
          <Text>{item.distance + " m" + "  " + item.price + " $/hr"} </Text>
          <AirbnbRating defaultRating={item.rating} size={20}/>
          <Text style={{fontWeight:"bold" ,marginRight:10}}>Schedule</Text>
          {dias.map((value, index)=>{
            if(value.horas.length!=0){
          
              return(
                  <View style={{alignItems:"center",flex:1,flexDirection:"row"}}>
                      <Text style={{fontWeight:"bold" ,marginRight:10}}>{value.name}</Text>
                      <Text style={{fontWeight:"bold"}}>{value.horas}</Text>
                  </View>)
              }
            })}
        </View>
        <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>cancel(item)}>
          <Text style={{color:"red"}} >Cancel Hire</Text>
        </TouchableOpacity>
      </View>
    );
  }

let hiredDogWalkers=[]
export default class DogWalkers extends React.Component {
 
    state = {
        data:[], 
        reservedDays:this.props.reservedDays,
        renderProfile:false,
        selectedWalker:{},
      }
 
  componentDidMount(){
    var newData=[]
      newData.push(this.props.dogWalkerProfile)
      this.setState({data:newData , reservedDays:this.props.reservedDays})
  
  }

  goBack=(item)=> {
     
  
    this.setState({selectedWalker:item, renderProfile:true})
    //this.props.navigation.navigate('DogWalker',{data:item});
  }

cancelHire=(currentItem)=> {
    var newData= this.state.data.filter(item=> item.email!=currentItem.email)
    this.setState({data:newData})
  
  }
  render(){
    if ((!this.state.renderProfile)){
            
      
    return (
      <View style={styles.container}>
      <Text style={{fontWeight:"bold", fontSize:20, textAlign:'center', color:'red'}}>Hired Dog walkers</Text>
      
      {!this.state.renderProfile ?
        <FlatList
          style={{flex:1}}
          data={this.state.data}
          renderItem={({ item}) => <Item item={item}  dias={this.state.reservedDays} callBack={this.goToDogWalkerProfile} cancel={this.cancelHire}/>}
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
        <DogWalkerProfile data={this.props.dogWalkerProfile} navigation={this.props.navigation} parentScreen={"DogWalkers"}/> 
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
