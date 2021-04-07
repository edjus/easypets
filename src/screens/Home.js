import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { login,logout } from '../redux/actions/auth';
import { validateEmail, validatePassword} from '../validation/userValidation'
import Header from '../components/Header';

export default function Home (props){
  return (
    <View  style={styles.container}>
      <Header name="Home" openDrawer={props.navigation.openDrawer}/>
        <Text style={styles.logo}>Welcome to EasyPet</Text>
    </View>
  )
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
});