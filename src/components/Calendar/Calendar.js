import React from 'react';
import{StyleSheet,Text, View,ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import Celda from './Cell.js'
import DogWalkerProfile from '../../screens/DogWalkerProfile'


/*
0 :No disponible
1:Disponible
2:Ocupada
3:Reservada

*/


export default class Calendar  extends React.Component{

    state = {
        num_columnas:7,
        num_filas:24,
        datos:this.props.calendario,   
        Owner: this.props.name,
        renderProfile:false,
        parent:this.props.parentScreen,
        navigation: this.props.navigation,
        selectedWalker:this.props.selectedWalker
      }
      
      goBack=()=> {
     
        this.setState({renderProfile:true});
      }

      renderLeyend() {
        return (
            <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
             
                    <Text style={styles.text}> {this.state.Owner}</Text>
       </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.celdaNoDisponible}/> 
            
                <View style={{ flex: 1}}>
                    <Text> Not Available </Text>
                </View>
                <View style={styles.celdaDisponible}/> 

            
                <View style={{ flex: 1}}>
                    <Text> Available</Text>
                </View>
              
           
            <View style={styles.celdaOcupada}/> 

            
                <View style={{ flex: 1}}>
                    <Text> Full</Text>
                </View>
                <View style={styles.celdaReservada}/> 

            
                <View style={{ flex: 1}}>
                    <Text> Reserved</Text>
                </View>
              
            </View>
            </View>
        );
        
    }

    renderHeader() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
            
                <View style={{ flex: 1}}>
                    <Text> Hr</Text>
                </View>

                <View style={{ flex: 1}}>
                    <Text> M</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> T</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> W</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> T</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> F</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> S</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Text> D</Text>
                </View>

              
            </View>
        );
        
    }
        reservar=()=>{
        let reservado=false;

        this.state.datos.map((item, index)=>{
            item.map((subitem,subIndex)=>{
                if(subitem==3){
                    reservado=true;
                    return;
                }
            })
            
        })
        if (!reservado){
            alert("Please reserve!")
        }
        console.log("reservando");

    }
    reservarCelda=(id)=>{
      
        const fila= id.split(',')[0];
        const columna= id.split(',')[1];
        let calen=this.state.datos;

        console.log("reservando celda", id , " fila ", fila, " columna ", columna);
        if(calen[fila][columna]==1){
            calen[fila][columna]=3;
    
            this.setState({datos:calen})
        }
        else if(calen[fila][columna]==3){
            calen[fila][columna]=1;
            this.setState({datos:calen})
            
        }


    }

      render(){
        if (!this.state.renderProfile){
            

        return (
            <ScrollView >
            <View style={{ flex: 1 , borderWidth: 1,
                borderColor: '#F44336',margin:10, marginTop:10}}>
                {this.renderLeyend()}
                { this.renderHeader()}
                {this.state.datos.map((items, index) => {
                        return (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1}}>
                                    <Text  style={styles.text}> {index}</Text>
                            </View>
                            {items.map((subItem, sIndex) => {
                                return <Celda id={String(index) +','+String(sIndex)} estado={subItem} reservar={this.reservarCelda}/>;
                            })}
                            </View>
                        );
                    })}
                    <View style={[{ width: "90%", margin:20}]}>
                    <Button
                            onPress={this.reservar}
                            title="Reserve"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                            />   
                    </View>      
                    <View style={[{ width: "90%", margin:20}]}>
                    <Button
                            onPress={this.goBack}
                            title="Go back"
                            color="blue"
                            accessibilityLabel="Learn more about this purple button"
                            />   
                    </View>     
            </View>
              
            </ScrollView>

        );
        }else{
            return(
                <DogWalkerProfile data={this.state.selectedWalker} navigation={this.state.navigation} parentScreen={"DogWalkers"}/> 
            )
        }

      }

}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
      textAlign:'center',
      textAlignVertical:'center',

    },
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F44336',
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