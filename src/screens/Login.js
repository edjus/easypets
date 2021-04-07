import React, { useState, useEffect } from 'react';
import {ImageBackground,StyleSheet, Text, Image,View, TextInput,Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { login,logout } from '../redux/actions/auth';
import { validateEmail, validatePassword} from '../validation/userValidation'
import Header from '../components/Header';
const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
export default function Login (props){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { isLoggedIn , user } = useSelector(state => state.auth);
    //const { message } = useSelector(state => state.message);

    const dispatch = useDispatch()


    useEffect(()=>
      {
        dispatch(logout());

      }
      ,[dispatch])

 
    const showRegisterForm = () => {
        props.navigation.navigate('Register');

        console.log("register pressed!!")
    }


    const handleLogin = () =>{
      if(validateInput()){
        console.log("dispatching login:" ,email, password)
        dispatch(login(email, password ));
      }
    }

    const validateInput =()=>{
      var isValid=true;

      console.log("password lenght", password.length)
      if (!validatePassword(password)){
        isValid=false;
        Alert.alert(
          "Password must me at leat 6 characters in lenght",
          "Password Incorrect",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () =>{ console.log("OK Pressed") }}
          ],
          { cancelable: false }
        );
      }
      if(!validateEmail(email))
        {
          isValid=false;
          Alert.alert(
            "Email is not valid",
            "Invalid email",
            [
              { text: "OK", onPress: () =>{ console.log("OK Pressed") }}
            ],
            { cancelable: false }
          );
        }
      return isValid;
    }
  
    if (isLoggedIn) {
      console.log("is logged in!! , state is", user)
      props.navigation.navigate('Task');
    }
    
        return (
            <View  style={styles.container}>
             <Header name="Login" openDrawer={props.navigation.openDrawer}/>
             <ImageBackground  source={Images.Onboarding}   style={{ flex: 1, height: height, width:width, zIndex: 1 }}>
             <View>
              <Image source={Images.NowLogo} style={{ width: 130, height: 150,alignSelf:'center'}} />
              </View>
                {/* <Text style={styles.logo}>EasyPet</Text> */}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={"Email..."}
                       placeholderTextColor="white"
                        value={email}
                        onChangeText={text=>setEmail(text)}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={"Password ..."}
                       placeholderTextColor="white"
                       value={password}
                        onChangeText={text=>setPassword(text)}
                    />
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}  onPress={handleLogin}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text 
                        style={styles.loginText}
                        onPress={showRegisterForm}>
                        
                        Not registered? Signup
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    
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
      marginBottom:40
    },
    inputView:{
      width:"80%",
      backgroundColor:"#4334eb",
      borderRadius:30,
      alignSelf:'center',
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white",
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:20,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10,
      alignSelf:'center',
    },
    loginText:{
      color:"white",
      alignSelf:'center',
      fontSize:20
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
  });