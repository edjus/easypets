import React from 'react';
import{StyleSheet,Text, View, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {Picker} from '@react-native-picker/picker'

const userTypeValues=[ "Client", "Dog Walker", "Food Provider","Events Provider"  ,"Pet Shop"];
export default class Register  extends React.Component{

    state={
        fistName:"",
        lastName:"",
        email:"",
        password:"",
        userType:"",
    }

    showLoginForm=()=> {
        this.props.navigation.navigate('Login');
    }
    render(){
        return(
            <View style={styles.container}>
            <Header name="Register" openDrawer={this.props.navigation.openDrawer}/>
                <Text style={styles.logo}>EasyPet</Text>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Name..."}
                   placeholderTextColor="white"
                    onChangeText={text=>this.setState({firsName:text})}
                />
                </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Last name..."}
                   placeholderTextColor="white"
                    onChangeText={text=>this.setState({lastName:text})}
                />
                 </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Email..."}
                   placeholderTextColor="white"
                    onChangeText={text=>this.setState({email:text})}
                />
                 </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Password..."}
                   placeholderTextColor="white"
                    onChangeText={text=>this.setState({password:text})}
                />
                 </View>
                 <View style={styles.inputView}>
                 <Text  style={styles.pickerText}>What&rsquo;s your interest?</Text>
                    <Picker
                          selectedValue={this.state.userType}
                          style={styles.inputText}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({userType: itemValue})
                          }>
                          {userTypeValues.map((value)=>{
                            return (<Picker.Item label={value} value={value} />)
                          })}
                    </Picker>


                 </View>
            
                <TouchableOpacity>
                    <Text style={styles.forgot} onPress={this.showLoginForm}
                    >Already registered?Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginText}>Register</Text>
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
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
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