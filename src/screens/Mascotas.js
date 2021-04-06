import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { getPets } from '../services/PetsService';
import Header from '../components/Header';

export default function Mascotas ({navigation}) {

  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
      const pets = getPets();
      setMascotas(pets);
  }, [])

  const enlazar = (dog) => {
    navigation.navigate("Profile", {dog})
  };

  const onAddPet = () => {
    navigation.navigate("Task");
  }

  return (
    <View>
    <View style={styles.container}>
    <Header name="Mascotas" openDrawer={navigation.openDrawer}/>
    </View>
    <View>
      <Text style={styles.logo}> My Pets</Text>
      {
        mascotas.map((dog, i) => (
          <ListItem key={i} bottomDivider onPress={() => enlazar(dog)}>
            <Avatar source={{uri: dog.imageUri}} />
            <ListItem.Content>
              <ListItem.Title>{dog.name}</ListItem.Title>
              <ListItem.Subtitle>{dog.breed}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <TouchableOpacity style={styles.loginBtn} onPress={onAddPet}>
        <Text style={styles.loginText}>Agregar</Text>
      </TouchableOpacity>
    </View>
    </View>
  );  
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