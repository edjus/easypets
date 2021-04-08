import React from 'react';
import {StyleSheet, Text, View, Image , TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import Home from './Onboarding'

export default function BuySuccessScreen ({navigation,precio}) {

  const [renderHome, setRenderHome]=React.useState(false);
  const goHome=()=> {
     
    setRenderHome(true);
    
  }

  // const price = navigation.getParam('price', 15.99);
  const price=precio;
  if(!renderHome){
  return (
    <ScrollView>
    <View  style={styles.container}>
      <Icon 
        name="check-circle" 
        type='font-awesome'
        color="#85e085"
        size={80}
        reverse
      />
      <Text style={styles.title}>
        Payment successful!
      </Text>
      <Text style={styles.whiteText}>
        Hooray! You have completed your payment.
      </Text>
      <Image 
        source={require("../../assets/deliverypet.png")}
        style={styles.image}
      />
        <Text style={styles.whiteText}>
          AMOUNT PAID
        </Text>
        <Text style={styles.yellowText}>
          US$ {price}
        </Text>
        <TouchableOpacity  onPress={()=>goHome()}>
                <Image style={styles.roundButton3} source={require('../../assets/dogHouse.png')}/>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );  }
  else{
    return(
      <Home navigation={navigation} />
    )
  }
}

const styles = StyleSheet.create({
    container: {
      color: "#ffff",
      backgroundColor: "#5cd65c",
      paddingTop:40,
      alignItems:"center",
      flex:1,
    },
    title : {
      color: "#ffff",
      fontSize: 30,
      fontWeight: 'bold',
      margin: 15
    },
    whiteText : {
      color: "#ffff",
      margin: 10,
      fontSize: 20,
      textAlign: 'center',
    },
    yellowText: {
      color: "#ffff33",
      fontWeight: 'bold',
      fontSize: 30,
    },
    image: {
      width: 120,
      height: 100,
    },
    roundButton3: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      padding: 0,
      marginTop:5,
      marginBottom:50,
    
      borderRadius: 100,
      backgroundColor: 'blue',
    },
  });