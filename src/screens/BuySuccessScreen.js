import React from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import { Icon } from 'react-native-elements'

export default function BuySuccessScreen ({navigation,precio}) {

  // const price = navigation.getParam('price', 15.99);
  const price=precio;
  return (
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
          {price}
        </Text>
    </View>
  );  
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
  });