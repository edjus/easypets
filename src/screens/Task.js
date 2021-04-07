import React from 'react';
import{StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
//import defaultImage from '../assets/images/defaultImage.png';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
const defaultImage='../assets/icon.png'
import Header from '../components/Header';
import { addPet } from '../services/PetsService';
import Mascotas from './Mascotas'
export default class Task extends React.Component{

    state={
        name:"",
        breed:"",
        weight:"",
        sex:"",
        birthday: "",
        fileData: null,
        fileUri:'https://www.hola.com/imagenes/estar-bien/20200828174216/razas-perro-dalmata-gt/0-859-148/dalmata-t.jpg', // valor por defecto
        renderMyPets:false,
    }

    componentDidMount(){

      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();

    }
     pickImage= async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
       this.setState({image:result.uri});
      }
    };


    cameraLaunch = async () => {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      let image = await ImagePicker.launchCameraAsync()
      
      .then((res)=>{
            this.setState({
            filePath: res,
            fileData: res.data,
            fileUri: res.uri
          });
      })
      .catch(error => console.log({ error }));
      console.log(image);

  }

  goBack=(item)=> {
     
    this.setState({renderMyPets:true})

  }
    addTask=()=> {

        const dataToSave={
                name:this.state.name,
                breed:this.state.breed,
                weight:this.state.weight,
                sex:this.state.sex,
                birthday:this.state.birthday,
                vaccines: [],
                treatment: null,
                imageData: this.state.fileData,
                imageUri:this.state.fileUri,

        }
        console.log("data to save ", dataToSave)
        addPet(dataToSave);
        this.setState({renderMyPets:true})
        //this.props.navigation.navigate("MyPets");
    }
    render(){
      if(!this.state.renderMyPets){
        return(
            <ScrollView>
              <View style={styles.container}>
                  <Header name="New Dog" openDrawer={this.props.navigation.openDrawer}/>
                <Text style={styles.logo}>Add pet</Text>
                <View style={styles.inputView}>
                  <TextInput
                      style={styles.inputText}
                      placeholder={"Name..."}
                      placeholderTextColor="white"
                      onChangeText={text=>this.setState({name:text})}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                      style={styles.inputText}
                      placeholder={"Breed..."}
                      placeholderTextColor="white"
                      onChangeText={text=>this.setState({breed:text})}
                  />
                 </View>
                 <View style={styles.inputView} >
                  <Picker
                    selectedValue={this.state.sex}
                    style={styles.inputText}
                    onValueChange={(itemValue, itemIndex) =>
                    this.setState({sex: itemValue})
                  }>
                      <Picker.Item label="MALE" value="MALE" />
                      <Picker.Item label="FEMALE" value="FEMALE" />
                  </Picker>
                </View>

                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Weight...(kg)"}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({weight:text})}
                />
                 </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Birthday...(dd/mm/yyyy)"}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({birthday:text})}
                />
                 </View>
                 <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
                 <TouchableOpacity onPress={this.cameraLaunch}>
                  <Image source= {{ uri: this.state.fileUri}} style={styles.image}
                    
                  />
                  </TouchableOpacity>
                </View>
                </View>
                  <View style={{  flexDirection:"row", alignItems:'center'}}>
               
             

              <TouchableOpacity  onPress={()=>this.goBack()}>
                    <Image style={styles.roundButton3} source={require('../../assets/back.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.addTask}  >
                     <Image style={styles.roundButton3} source={require('../../assets/plus.png')}/>
                </TouchableOpacity>
              </View>
             
   
            </ScrollView>
        )
      }else{
        return(
          <Mascotas navigation={this.props.navigation} />
        )
      }
    }
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
      fontSize:30,
      color:"#fb5b5a",
      marginBottom:10
    },
    inputView:{
      width:"80%",
      backgroundColor:"#4334eb",
      borderRadius:30,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
      height:50,
      color:"white",
    },
    pickerText:{
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
      alignSelf:'center',
      borderRadius: 100,
      marginLeft:40,
      backgroundColor: 'blue',
    },
    loginText:{
      color:"white"
    },
      image:
                {
                // Setting up image width.
                width: 100,
                
                // Setting up image height.
                height: 100,
                
                // Set border width.
                borderWidth: 1,
                
                // Set border color.
                borderColor: '#F44336',
              
                }
  });