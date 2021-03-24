import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import Header from '../components/Header';

const pluto = {
  nombre: "Pluto",
  foto: "https://t2.ea.ltmcdn.com/es/razas/5/5/0/img_55_golden-retriever-o-cobrador-dorado_0_600.jpg",
  fechaNacimiento: "12-12-2010",
  raza: "Golden Retriver"
}

export default function DetalleMascota ({navigation,mascota = pluto}) {

  const [tratamiento, setTratamiento] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mostrarTratamiento = () => {
    let detalleTratamiento = "";

    if (tratamiento) {
      detalleTratamiento = `${mascota.nombre} debe: ${tratamiento}`;
    }
    else {
      detalleTratamiento = `${mascota.nombre} no tiene ningún tratamiento`;
    }

    return Alert.alert(detalleTratamiento);
  };

  const icono = tratamiento ? "pencil" : "plus-circle";

  return (
    <View  style={styles.container}>
      <Header name="Profile" openDrawer={navigation.openDrawer}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
            Ingrese una descripción del tratamiento:
            </Text>
            <TextInput
              style={styles.inputText}
              value={tratamiento}
              onChangeText={texto=>setTratamiento(texto)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Aceptar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Card>
        <Card.Title>
          <Text style={styles.logo}> {`${mascota.nombre}`}</Text>
        </Card.Title>
        <Card.Divider />
        <Card.Image source={{ uri: mascota.foto }} />
        <View>
          <Text>Fecha de Nacimiento:</Text> 
          <Text>{mascota.fechaNacimiento}</Text>

          <Text>Raza:</Text> 
          <Text>{mascota.raza}</Text>
        </View>
      <TouchableOpacity style={styles.loginBtn} onPress={()=>Alert.alert("No tiene vacunas pendientes")}>
        <Text style={styles.loginText}>
          <Icon name='medkit' type='font-awesome' color='#fff' /> Vacunas
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity style={styles.loginBtn} onPress={()=>mostrarTratamiento()}>
          <Text style={styles.loginText}>
            <Icon name='heartbeat' type='font-awesome' color='#fff' /> Tratamiento
          </Text>
        </TouchableOpacity>
        <Icon name={icono} type='font-awesome' color='#000' onPress={()=>setModalVisible(true)} />
        {tratamiento && <Icon name="trash" type='font-awesome' color='#000' onPress={()=>setTratamiento(null)} />}
      </View>
      </Card>
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
      width: "80%",
      borderWidth: 1,
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:10,
      height:45,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      elevation: 2
    },
    loginText:{
      color:"white",
      fontSize: 30
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    button: {
      borderRadius: 5,
      padding: 10,
      marginTop: 5,
      elevation: 2
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
  });