import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import Header from '../components/Header';

const mascotas = [
  {
    nombre: 'Pipo',
    foto: 'https://t2.ea.ltmcdn.com/es/images/6/9/3/enfermedades_mas_comunes_en_perros_caniches_23396_600_square.jpg',
    raza: 'Caniche',
    fechaNacimiento: "12-12-2015"
  },
  {
    nombre: 'Rocky',
    foto: 'https://t2.ea.ltmcdn.com/es/razas/5/5/0/img_55_golden-retriever-o-cobrador-dorado_0_600.jpg',
    raza: 'Golde Retriver',
    fechaNacimiento: "20-06-2017"
  },
  {
    nombre: 'Manchas',
    foto: 'https://www.hola.com/imagenes/estar-bien/20200828174216/razas-perro-dalmata-gt/0-859-148/dalmata-t.jpg',
    raza: 'Dalmata',
    fechaNacimiento: "05-01-2021"
  },
]

export default function Mascotas ({navigation}) {

  const enlazar = (perro) => {
    return Alert.alert(`Llamar a detalle con -perro- ${perro.nombre}`);
  };

  return (
    <View>
    <View style={styles.container}>
    <Header name="Mascotas" openDrawer={navigation.openDrawer}/>
    </View>
    <View>
      <Text style={styles.logo}> Mis Mascotas</Text>
      {
        mascotas.map((perro, i) => (
          <ListItem key={i} bottomDivider onPress={() => enlazar(perro)}>
            <Avatar source={{uri: perro.foto}} />
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