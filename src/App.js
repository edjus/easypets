import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'

import Login from './screens/Login';
import Register from './screens/Register';
import Task from './screens/Task';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore'

let store = configureStore()

//const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <Provider store={store}>
   
      <NavigationContainer>
        {/* <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator> */}
        <Drawer.Navigator  drawerContentOptions={{
      activeTintColor: '#e91e63',
      itemStyle: {marginVertical: 5},
    }} unmountInactiveRoutes= {true} headerMode= {"none"}  initialRouteName="Login">
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Task" component={Task} />
        </Drawer.Navigator>

      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
