import React from 'react';
import{StyleSheet,Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {Picker} from '@react-native-picker/picker'

const userTypeValues=[ "Client", "Dog Walker", "Food Provider","Events Provider"  ,"Pet Shop"];
import { Rating, AirbnbRating } from 'react-native-ratings';
import Calendar from '../components/Calendar/Calendar'
import Map from './Map';
// import image from '../../assets/johnWick.jfif'

const profileData={
    name: "Edson Justo",
    photo:'../../assets/ed.png',
    email: 'edson.justo@gmail.com'
}
export default class DogWalkerProfile  extends React.Component{

    state={
        name:profileData.name,
        email:profileData.email,
        photo:profileData.photo,
        
    }


    

    goBack=()=> {
      console.log("go back  clicked" , typeof(this.props.parentScreen), " ", this.state.parent)
      
        if(this.props.parentScreen=="Map"){
           console.log("go back  clicked" , typeof(this.props.parentScreen), " ", this.state.parent)
           this.state.navigation.navigate('DogMap');
        }else if(this.props.parentScreen=="DogWalkers"){
           this.state.navigation.navigate("DogWalkers");
        }
    }
   
   
    render(){

        return(
           
            <View style={styles.container}>
            <Header name="Profile" openDrawer={this.props.navigation.openDrawer}/>
                <Text style={styles.logo}>Profile</Text>
                <View style={{flexDirection:"row" }}>
                    <View style={{flex:1, alignSelf:'center'}}>
                    <Image source={require('../../assets/ed.png')}  style={{width:120, height:200,alignSelf:'center'}} />
                    </View>
                </View>
                <Text style={styles.titleText}> Name</Text>
                <View style={styles.inputView}>
            
                    <TextInput
                        style={styles.inputText}
                        placeholderTextColor="white"
                        value={this.state.name}
                        editable={true}
                        onChangeText={text=>this.setState({name:text})}
                    />
                </View>
                <Text style={styles.titleText}> Email</Text>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    value={this.state.email}
                    editable={true}
                   placeholderTextColor="white"

                    onChangeText={text=>this.setState({email:text})}
                />
                 </View>
               
                 

            </View>
        
        )
     
          

    }




}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
    logo:{
      fontWeight:"bold",
      fontSize:40,
      color:"#fb5b5a",
      marginBottom:20
    },
    inputView:{
      width:"90%",
      backgroundColor:"#6c89f5",
      borderRadius:10,
      height:40,
      marginTop:0,
      justifyContent:"center",
     
    },
    inputText:{
      height:30,
      color:"white",
      marginLeft:20,
    },

    titleText:{
      height:50,
      color:"red",
      alignSelf:'center',
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
      marginTop:5,
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