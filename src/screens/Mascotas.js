import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image,Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { getPets,deletePet } from '../services/PetsService';
import Header from '../components/Header';
import Task from './Task'




function Item ({item, callback, erase}){
 
  console.log("item recibdo: ", item)
  return (
    <View style={styles.listItem}>
    <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>callback(item)}>
      <Image source={{uri:item.imageUri}}  style={{width:60, height:60,borderRadius:30}} />
      </TouchableOpacity>
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
      </View>
      <View style={{alignItems:"center",flex:1}}>
        <Text style={{fontWeight:"bold"}}>{item.breed}</Text>
        <Text style={{fontWeight:"bold"}}>{item.sex}</Text>
      </View>
      <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}} onPress={()=>erase(item)}>
          <Text style={{color:"red"}} >Delete</Text>
        </TouchableOpacity>
    
    </View>
  );
}
export default function Mascotas({ navigation }) {

  const [mascotas, setMascotas] = useState([]);
  const [renderTask, setRenderTask] = useState(false);

  useEffect(() => {
    const pets = getPets();
    setMascotas(pets);
  }, [])

  const enlazar = (dog) => {
    navigation.navigate("DetalleMascota", {dog})
  };

  const onAddPet = () => {
    setRenderTask(true);
    navigation.navigate("Task");
  }
  const erasePet = (pet) => {
    deletePet(pet)
    const pets = getPets();
    setMascotas(pets);
  
  }

  if (!renderTask) {
    return (

      
      <View style={styles.container}>
          <Header name="MyPets" openDrawer={navigation.openDrawer} />
        
        
          {/* <Text style={styles.logo}> My Pets</Text> */}
        
          <FlatList
          style={{flex:1}}
          data={mascotas}
          renderItem={({ item}) => <Item item={item} callback={enlazar} erase={erasePet}/>}
          keyExtractor={item => item.name}
        />
      
          <TouchableOpacity  onPress={onAddPet}>
                 <Image style={styles.roundButton2} source={require('../../assets/addDog.png')} />
                    {/* <Text style={styles.loginText} >Show Calendar</Text> */}
                </TouchableOpacity>
        
      </View>
    );
  } else {
    return (
      <Task navigation={navigation} />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:20
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"80%",
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
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
 
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    marginBottom:50,
    borderRadius: 100,
  
    resizeMode: 'contain'
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
  loginText: {
    color: "white"
  }
});