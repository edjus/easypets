import React from 'react';
import{StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
//import defaultImage from '../assets/images/defaultImage.png';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
const defaultImage='../assets/icon.png'
import Header from '../components/Header';
export default class Task extends React.Component{

    state={
        name:"",
        description:"",
        owner:"",
        priority:"",
        responsible:"",
        area:"",
        coordinates:[],
        image:null,
        filePath: "",
        fileData: null,
        fileUri:null,
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
      // ImagePicker.launchCamera(options, (res) => {
      //   console.log('Response = ', res);
  
      //   if (res.didCancel) {
      //     console.log('User cancelled image picker');
      //   } else if (res.error) {
      //     console.log('ImagePicker Error: ', res.error);
      //   } else if (res.customButton) {
      //     console.log('User tapped custom button: ', res.customButton);
      //     alert(res.customButton);
      //   } else {
      //     const source = { uri: res.uri };
      //     console.log('response', JSON.stringify(res));
      //     this.setState({
      //       filePath: res,
      //       fileData: res.data,
      //       fileUri: res.uri
      //     });
      //   }
      // });
  }


    addTask=()=> {

        const dataToSave={
                taskName:this.state.name,
                description:this.state.description,
                owner:this.state.owner,
                priority:this.state.priority,
                responsible:this.state.responsible,
                area:this.state.area,
                coordinates:this.state.coordinates,
                imageData: this.state.fileData,
                imageUri:this.state.fileUri,

        }
        console.log("data to save ", dataToSave)
    }
    render(){
        return(
            <View style={styles.container}>
                  <Header name="Task" openDrawer={this.props.navigation.openDrawer}/>
                <Text style={styles.logo}>EasyPet</Text>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"task title..."}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({name:text})}
                />
                </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Description..."}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({description:text})}
                />
                 </View>
                 <View style={styles.inputView} >
  
                    <Text  style={styles.pickerText}>What&rsquo;s the priority?</Text>
                    <Picker
                          selectedValue={this.state.priority}
                          style={styles.inputText}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({priority: itemValue})
                          }>
                          <Picker.Item label="LOW" value="LOW" />
                          <Picker.Item label="MEDIUM" value="MEDIUM" />
                          <Picker.Item label="HIGH" value="HIGH" />
                          <Picker.Item label="URGENT" value="URGENT" />
                    </Picker>
                </View>

                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Owner..."}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({owner:text})}
                />
                 </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Resposible..."}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({responsible:text})}
                />
                 </View>
                <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                   placeholder={"Area..."}
                    placeholderTextColor="white"
                    onChangeText={text=>this.setState({area:text})}
                />
                 </View>
                 <View style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
                 <TouchableOpacity onPress={this.cameraLaunch}>
                  <Image source= {{ uri: this.state.fileUri}} style={styles.image}
                    
                  />
                  </TouchableOpacity>
                </View>
            
                <TouchableOpacity onPress={this.addTask} style={styles.loginBtn}>
                    <Text style={styles.loginText}>Add Task</Text>
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