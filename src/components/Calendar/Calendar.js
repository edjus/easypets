import React from 'react';
import{StyleSheet,Text, View,ScrollView, Button, Image, TextInput, TouchableOpacity } from 'react-native';
import Celda from './Cell.js'
import DogWalkerProfile from '../../screens/DogWalkerProfile'
import { PrivateValueStore } from '@react-navigation/core';
import HiredDogWalkers from '../../screens/HiredDogWalkers'

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
        reservedDays:[],   
        Owner: this.props.name,
        renderProfile:false,
        parent:this.props.parentScreen,
        navigation: this.props.navigation,
        selectedWalker:this.props.selectedWalker,
        renderHiredWalker:false,
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
        getDaysByIndex=(id)=>{
            switch(id){
                case 0: return "Mon"
                case 1: return "Tue"
                case 2: return "Wen"
                case 3: return "Thr"
                case 4: return "Fri"
                case 5: return "Sat"
                case 6: return "Sun"

            }

        }
        reservar=()=>{
        let reservado=false;
        let reservedDays=[]

    
        this.state.datos.map((item, index)=>{
            item.map((subitem,subIndex)=>{
                if(subitem==3){
                    reservado=true;
                    
                }
            })
            
        })
        if (!reservado){
            alert("Please reserve!")
            return; 
        }

        for(let i=0; i<7; i++){
            let DayName=this.getDaysByIndex(i);
            
            console.log("dia:" , DayName)
            let day={}
            day['name']=DayName,
            //day[DayName]={'horas':[]}
            day['horas']=[];
            let cambio=false;
            let horario='';
            cambio=false;
            for(let j=0; j<23; j++){
              
                if(this.state.datos[j][i]==3){

                    if(!cambio){
                        horario+= j.toString()
                        cambio=true;
                    }
                
             }else if((this.state.datos[j][i]!=3) &&(cambio)){
                horario+='-'+ j.toString()
                //day[DayName]['horas'].push(horario);
                day['horas'].push(horario);
                horario=''
                cambio=false;
             }
            
            }
            
            reservedDays.push(day)
        }
        console.log("reserved days:" , reservedDays)
        
        this.setState({reservedDays:reservedDays , renderHiredWalker:true})
       
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
        if ((!this.state.renderProfile)&&(!this.state.renderHiredWalker)){
            

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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity  onPress={()=>this.reservar()}>
                        <Image style={styles.roundButton3} source={require('../../../assets/hired.png')}/>
                    </TouchableOpacity> 
                    <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
                    {/* <Text style={styles.loginText} >Go Back</Text> */}
                </TouchableOpacity> 
                    </View>     
            </View>
              
            </ScrollView>

        );
        }else if(!this.state.renderHiredWalker){
            return(
                <DogWalkerProfile data={this.state.selectedWalker} navigation={this.state.navigation} parentScreen={"DogWalkers"}/> 
            )
        }else{
            return(
                <HiredDogWalkers dogWalkerProfile={this.state.selectedWalker} reservedDays={this.state.reservedDays}/>
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
        marginTop: 20,
        marginLeft:40,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 100,
        backgroundColor: '#fb5b5a',
      },
      roundButton3: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        marginTop:5,
        marginBottom:20,
        marginRight:20,
        marginLeft:30,
        borderRadius: 100,
        backgroundColor: 'blue',
      }, 
  
  });