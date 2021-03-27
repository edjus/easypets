import React from 'react';
import{StyleSheet,Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {Picker} from '@react-native-picker/picker'

const userTypeValues=[ "Client", "Dog Walker", "Food Provider","Events Provider"  ,"Pet Shop"];
import { Rating, AirbnbRating } from 'react-native-ratings';
export default class DogWalkerProfile  extends React.Component{

    state={
        profileData:this.props.data,
        parent:this.props.parentScreen
    }

    goBack=()=> {
      console.log("go back  clicked" , typeof(this.props.parentScreen), " ", this.state.parent)
      
        if(this.props.parentScreen=="Map"){
           console.log("go back  clicked" , typeof(this.props.parentScreen), " ", this.state.parent)
           this.props.navigation.navigate('DogMap');
        }else if(this.props.parentScreen=="DogWalkers"){
           this.props.navigation.navigate("DogWalkers");
        }
    }
    render(){
        return(
            <View style={styles.container}>
            {/* <Header name="Register" openDrawer={this.props.navigation.openDrawer}/> */}
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
               
            
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Hire</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={()=>this.goBack()}>
                    <Text style={styles.loginText} >Go Back</Text>
                </TouchableOpacity>

                

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
    loginText:{
      color:"white"
    }
  });