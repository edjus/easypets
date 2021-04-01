import React from 'react';
import{StyleSheet,Text, View, TextInput, TouchableOpacity } from 'react-native';




function  CeldaNoDisponible(){
    return (
      <View style={styles.container}>
        <View style={styles.celdaNoDisponible} >
          
        </View>
      </View>
    );
}

function  CeldaDisponible({callBack}){
    return (
        <TouchableOpacity style={styles.container} onPress={()=>callBack()}>
        <View style={styles.celdaDisponible} >
        </View>
            </TouchableOpacity>
        
 
    );
}

function  CeldaOcupada(){
    return (
      <View style={styles.container}>
        <View style={styles.celdaOcupada} >
            
                <Text> </Text>
   
        </View>
      </View>
    );
}

function  CeldaReservada({callBack}){
    return (

        <TouchableOpacity style={styles.container} onPress={()=>callBack()}>
   
         <View style={styles.celdaReservada} >
          
                
          
        </View>
     
      </TouchableOpacity>
      
    );
}
export default class Celda  extends React.Component{

    state = {
        id:this.props.id,
        estado:this.props.estado || 0
      }
 
      reservar=()=> {
        console.log("click!! ")
        if (this.state.estado==1){
            console.log("click en reservar reservar ")
            this.setState({estado:3}); 
            this.props.reservar(this.state.id);


        }else if (this.state.estado==3){
            console.log("click en cancelar reserva ")
            this.setState({estado:1})  
            this.props.reservar(this.state.id);
 

        }
        
      }
     
      

      render(){
        return (
            <View id={this.state.id} style={styles.container}>


               
                {(this.state.estado==0) && <CeldaNoDisponible />}
                {(this.state.estado==1) && <CeldaDisponible callBack={this.reservar} />}
                {(this.state.estado==2) && <CeldaOcupada />}
                {(this.state.estado==3) && <CeldaReservada callBack={this.reservar}/>}
            </View>
        );

      }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'blue',
    },
    celdaDisponible: {
      backgroundColor: 'forestgreen',
      flex: 1,
      aspectRatio: 1
    },
    celdaNoDisponible: {
        backgroundColor: 'grey',
        flex: 1,
        aspectRatio: 1
      },
    celdaOcupada: {
        backgroundColor: 'darkred',
        flex: 1,
        aspectRatio: 1
    },

    celdaReservada: {
        backgroundColor: 'dodgerblue',
        flex: 1,
        aspectRatio: 1
    },   
  });