import React from 'react';
import{StyleSheet,Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {Picker} from '@react-native-picker/picker'

const userTypeValues=[ "Client", "Dog Walker", "Food Provider","Events Provider"  ,"Pet Shop"];
import { Rating, AirbnbRating } from 'react-native-ratings';
import Calendar from '../components/Calendar/Calendar'
import Map from './Map';
import { ScrollView } from 'react-native-gesture-handler';
import DogWalkers from './DogWalkers'

export default class DogWalkerProfile  extends React.Component{

    state={
        profileData:this.props.data,
        parent:this.props.parentScreen,
        calendar:false,
        map:false,
        navigation: this.props.navigation,
        renderDogWalkers:false
    }


    

    goBack=()=> {
      this.setState({renderDogWalkers:true})
      
    }
    showCalendar=()=> {
      this.setState({calendar:true})

    }
    showShowMap=()=> {
      this.setState({map:true})

    }
    render(){
      if ((!this.state.calendar)&&( !this.state.renderDogWalkers)){
        return(
            <ScrollView>

            <View style={styles.container}>
              <Header name="DogWalkers" openDrawer={this.props.navigation.openDrawer}/>
                <Text style={styles.logo}>Dog Walker</Text>
                <View style={{flexDirection:"row" }}>
                    <View style={{flex:1, marginLeft:50}}>
                    <Image source={{uri:this.state.profileData.photo}}  style={{width:80, height:80,borderRadius:30}} />
                    </View>
                    <View style={{flex:1,marginRight:40}}>
                    <AirbnbRating defaultRating={this.state.profileData.rating} size={20}/>
                    </View>
                </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholderTextColor="white"
                    value={"Name: " + this.state.profileData.name}
                    editable={false}
                    onChangeText={text=>this.setState({firsName:text})}
                />
                </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={"Distance: " + this.state.profileData.distance}
                    editable={false}
                   placeholderTextColor="white"

                    onChangeText={text=>this.setState({lastName:text})}
                />
                 </View>
                 <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={"Price: " + this.state.profileData.price}
                    editable={false}
                   placeholderTextColor="white"

                    onChangeText={text=>this.setState({lastName:text})}
                />
                 </View>
                 <View style={{ flex: 1, flexDirection: 'row' }}>
                 {/* <TouchableOpacity  onPress={()=>this.showShowMap()}>
                 <Image style={styles.roundButton1} source={require('../../assets/mapa.png')} />
                </TouchableOpacity> */}
                <TouchableOpacity  onPress={()=>this.goBack()}>
                  <Image style={styles.roundButton3} source={require('../../assets/back.png')}/>
                </TouchableOpacity>
                 <TouchableOpacity  onPress={()=>this.showCalendar()}>
                 <Image style={styles.roundButton3} source={require('../../assets/calendar.png')} />
                    {/* <Text style={styles.loginText} >Show Calendar</Text> */}
                </TouchableOpacity>
      
                
                
                </View>
            </View>
            </ScrollView>
        )
      }else if (this.state.calendar){
        return(
          <Calendar name={this.state.profileData.name}  navigation={this.props.navigation} selectedWalker={this.state.profileData} calendario={this.state.profileData.calendario}/>
        )
      }else{
        return(
          <DogWalkers navigation={this.props.navigation}   />
        )
      }
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:20,
    alignItems:"center",
    flex:1
  },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:20
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginTop:20,
      justifyContent:"center",
     
    },
    inputText:{
      height:50,
      color:"white",
      marginLeft:50,
    },
    forgot:{
      color:"red",
      fontSize:15,
   
     
    },
    pickerText:{
      color:"red",
      fontSize:15,
      marginBottom:10,
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    roundButton1: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginTop:30,
      marginRight:20,
      borderRadius: 100,
      backgroundColor: 'orange',
    },
    roundButton2: {
      marginTop: 20,
      marginLeft:40,
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 100,
      backgroundColor: '#fb5b5a',
    },
    roundButton3: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      marginTop:40,
      marginBottom:20,
      marginRight:40,
      borderRadius: 100,
      backgroundColor: 'blue',
    },
    loginText:{
      color:"white"
    },
    buttonImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
  });