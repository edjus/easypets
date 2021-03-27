import React from 'react';
import { StyleSheet, Text, View , Button, TextInput, TouchableOpacity} from 'react-native';

class  AddPlace extends React.Component {
  constructor(props){
    super(props);
    this.state={
            searchedPlace:""
    }


    this.handleSearch=this.handleSearch.bind(this)

  }

 handleSearch(){


 
         
      this.props.addPlaceToMap(this.state.searchedPlace)



  }
  render(){
  return (

    
        
        <View style={styles.container}>
            <View style={{flexDirection:"row"}}>
        
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="  tu lugar..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({searchedPlace:text})}/>
                </View>
            
            
                <TouchableOpacity style={styles.loginBtn}   onPress={this.handleSearch}>
                    <Text style={styles.loginText} >Search</Text>
                </TouchableOpacity>
             </View>
      
      </View>
    
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6
  },

  inputView:{
    width:"70%",
    backgroundColor:"white",
    borderRadius:25,
    height:50,
  
    justifyContent:"center",
 
  },
  inputText:{
    height:50,
    color:"#fb5b5a",
    padding:10

  },
  
  loginBtn:{
    width:"30%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    
    
  },
  loginText:{
    color:"white"
  }
});

export default AddPlace;