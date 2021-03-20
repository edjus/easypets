import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import { login,logout } from '../redux/actions/auth';
import { validateEmail, validatePassword} from '../validation/userValidation'
import { ListItem, Avatar } from 'react-native-elements'


const mascotas = [
  {
    nombre: 'Pipo',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    raza: 'Caniche'
  },
  {
    nombre: 'Rocky',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    raza: 'Golde Retriver'
  },
]

export default function Mascotas () {

  const enlazar = (perro) => {
    return Alert.alert(`Llamar a detalle con -perro- ${perro.nombre}`);
  };

  return (
    <View>
      <Text style={styles.logo}> Mis Mascotas</Text>
      {
        mascotas.map((perro, i) => (
          <ListItem key={i} bottomDivider onPress={() => enlazar(perro)}>
            <Avatar source={{uri: perro.avatar_url}} />
            <ListItem.Content>
              <ListItem.Title>{perro.nombre}</ListItem.Title>
              <ListItem.Subtitle>{perro.raza}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );  
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
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