import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable, ScrollView } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import Header from '../components/Header';
import { addNewVaccioneToPet, addTreatmentToPet } from '../services/PetsService';
import { Input } from 'react-native-elements';


export default function DetalleMascota ({navigation}) {

  const mascota = navigation.getParam('dog');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVaccinesVisible, setModalVaccinesVisible] = useState(false);
  const [newVaccine, setNewVaccine] = useState(null);
  const [changed, setChanged] = useState(false);

  const setTratamiento = (text) => {
    addTreatmentToPet(mascota.id, text);
    setChanged(!changed);
  }

  const mostrarTratamiento = () => {
    let detalleTratamiento = "";
    if (mascota.treatment) {
      detalleTratamiento = `${mascota.name} should: ${mascota.treatment}`;
    }
    else {
      detalleTratamiento = `${mascota.name} does not have a treatment`;
    }

    return Alert.alert(detalleTratamiento);
  };

  const confirmNewVaccine = () => {
    setModalVaccinesVisible(!modalVaccinesVisible);
    addNewVaccioneToPet(mascota.id, newVaccine);
    setNewVaccine(null);
    setChanged(!changed);
  }

  const mostrarVaccines = () => {
    let detalle = "";
    if (mascota.vaccines.length > 0) {
      detalle = mascota.vaccines.reduce((acc, value) => `${acc} - ${value}\n`, "\n");
    }
    else {
      detalle = "No vaccines register"
    }

    Alert.alert(detalle);
  }

  return (
    <ScrollView style={styles.container}>
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
              Enter a treatment:
              </Text>
              <TextInput
                style={styles.inputText}
                value={mascota.treatment}
                onChangeText={texto=>setTratamiento(texto)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVaccinesVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVaccinesVisible(!modalVaccinesVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
              Add vaccines:
              </Text>
              <TextInput
                style={styles.inputText}
                value={newVaccine}
                onChangeText={texto=>setNewVaccine(texto)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => confirmNewVaccine()}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Card>
          <Card.Title>
            <Text style={styles.logo}> {`${mascota.name}`}</Text>
          </Card.Title>
          <Card.Divider />
          <Card.Image source={{ uri: mascota.imageUri }} />
            <View style={styles.rowContainer}>
              <Text style={styles.infoRecipe}>Birthday:</Text> 
              <Text style={styles.infoDescriptionRecipe}>{mascota.birthday}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.infoRecipe} >Breed:</Text> 
              <Text style={styles.infoDescriptionRecipe}>{mascota.breed}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.infoRecipe} >Sex:</Text> 
              <Text style={styles.infoDescriptionRecipe}>{mascota.sex}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.infoRecipe} >Weight:</Text> 
              <Text style={styles.infoDescriptionRecipe}>{mascota.weight} kg</Text>
            </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>mostrarVaccines()}>
              <Text style={styles.loginText}>
                <Icon name='medkit' type='font-awesome' color='#fff' /> Vaccines
              </Text>
            </TouchableOpacity>
            <View style={styles.icon}>
              <Icon name="plus-circle" type='font-awesome' color='#52c76f' onPress={()=>setModalVaccinesVisible(true)} size={30} />
            </View>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity style={styles.loginBtn} onPress={()=>mostrarTratamiento()}>
              <Text style={styles.loginText}>
                <Icon name='heartbeat' type='font-awesome' color='#fff' /> Treatment
              </Text>
            </TouchableOpacity>
            <View style={styles.icon}>
              {
                mascota.treatment ? 
                (<Icon name="trash" type='font-awesome' color='#52c76f' onPress={()=>setTratamiento(null)} />)
              :
                (<Icon name="plus-circle" type='font-awesome' color='#52c76f' onPress={()=>setModalVisible(true)} size={30} />)
              }
            </View>
          </View>
        </Card>
    </ScrollView>
  );  
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      flex:1
    },
    logo:{
      fontWeight:"bold",
      fontSize:40,
      color:"#fb5b5a",
      marginBottom: 20
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
      borderWidth: 1,
    },
    forgot:{
      color:"white",
      fontSize:11
    },
    loginBtn:{
      width:"60%",
      backgroundColor:"#8fd1f7",
      borderRadius:10,
      height:45,
      alignItems:"center",
      justifyContent:"center",
      elevation: 2
    },
    loginText:{
      color:"white",
      fontSize: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
      backgroundColor: "#68f7ab",
      alignItems: 'center',
      width: '80%',
      marginLeft: 160
    },
    infoRecipe: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 5,
    },
    rowContainer: {
      flexDirection: 'row',
      paddingTop: 5,
    },
    infoDescriptionRecipe: {
      fontSize: 16,
      paddingLeft: 10,
    },
    icon: {
      padding: 10,
    },
  });