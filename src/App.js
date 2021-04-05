import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createDrawerNavigator } from '@react-navigation/drawer'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation";
import Login from './screens/Login';
import Register from './screens/Register';
import Task from './screens/Task';
import DetalleMascota from './screens/DetalleMascota';
import Mascotas from './screens/Mascotas';
import DogWalkers from './screens/DogWalkers'
import DogMap from './screens/Map'
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore'
import Profile from './screens/Profile'
import { Ionicons, MaterialCommunityIcons,Foundation,FontAwesome5,FontAwesome,AntDesign,Entypo  } from '@expo/vector-icons';
import Market from './screens/Market/Market'
import Events from './screens/Events/EventsScreen'

const profileData={
  name: "John  Wick",
  photo:'../../assets/johnWick.png',
  email: 'IkillYouIfYouTouchMyDog@WickLove.com'
}

const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Ionicons name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)


let store = configureStore()

//const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();

function Item({ item, navigate }) {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      {/* <Ionicons name={item.icon} size={32} /> */}
      {item.icon}
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"LogIn/LogOut",
              icon:<AntDesign name="login" size={32} color="red" />
          },
          // {
          //     name:"Register",
          //     icon:<FontAwesome5 name="user-plus" size={32} color="red" />
          // },
          {
              name:"Market",
              icon: <Entypo name="shop" size={32} color="red" />

          },
          {
            name:"Events",
            icon:<FontAwesome name="birthday-cake" size={32} color="red" />

        },
          {
            name:"Profile",
            icon:<FontAwesome5 name="dog" size={32} color="red" />
        },
       
        {
          name:"MyPets",
          icon:<MaterialCommunityIcons name="dog" size={32} color="red" />
        },
        {
          name:"DogWalkers",
          icon:<Foundation name="guide-dog" size={32} color="red" />
        },
        {
          name:"DogMap",
          icon:<FontAwesome name="map" size={32} color="red" />
        },

      ]
  }

  
  render(){
      return (
          <View style={styles.container}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile')}>
              <Image source={require("../assets/johnWick.png")} style={styles.profileImg} resizeMode="contain"/>
              </TouchableOpacity>
              <Text style={{fontWeight:"bold",fontSize:16,marginTop:10}}>{profileData.name}</Text>
              <Text style={{color:"gray",marginBottom:10}}>{profileData.email}</Text>
              <View style={styles.sidebarDivider}></View>
              <FlatList
                  style={{width:"100%",marginLeft:30}}
                  data={this.state.routes}
                  renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
                  keyExtractor={item => item.name}
              />
          </View>
      )
  }
}

const Drawer = createDrawerNavigator(
  {
    'LogIn/LogOut':{ screen: Login},
    // Register:{ screen: Register},
    Market:{ screen: Market},
    Events:{ screen:Events},
    Profile:{screen: Profile},
    MyPets:{screen:Mascotas},
    DogWalkers:{screen:DogWalkers},
    DogMap:{screen:DogMap}

  },
  {
    initialRouteName: "LogIn/LogOut",
    unmountInactiveRoutes: true,
    headerMode: "none",
    contentComponent: props => <Sidebar {...props} />
  }
)

const AppNavigator = createStackNavigator(
  {
    Drawer : {screen: Drawer,
      navigationOptions: {
      header: null,
    }},

  },
  {
    initialRouteName: "Drawer",
    unmountInactiveRoutes: true,
  
  }
)

const AppContainer = createAppContainer(AppNavigator);
export default function App() {
  return (
    <Provider store={store}>

    <AppContainer />

    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop:40,
    alignItems:"center",
    flex:1

  },
  listItem:{
      height:60,
      alignItems:"center",
      flexDirection:"row",
  },
  title:{
      fontSize:18,
      marginLeft:20
  },
  header:{
    width:"80",
    height:60,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
  },
  profileImg:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:5,
    color:'red'
  },
  sidebarDivider:{
    height:1,
    width:"80 %",
    backgroundColor:"lightgray",
    marginVertical:10
  }
});