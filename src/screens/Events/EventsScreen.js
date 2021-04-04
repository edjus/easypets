import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { categories } from '../../database/dataArrays';
import { getNumberOfRecipes } from '../../database/MockDataAPI';
import Header from '../../components/Header';
import EventList from '../EventsList/EventsListScreen'
export default class EventsScreen extends React.Component {
  
  constructor(props) {
    super(props);
   
  }
    state={
    renderEventList:false,
    title:'',
    category:''
  }

  onPressCategory = item => {
    const title = item.name;
    const category = item;
    this.setState({renderEventList:true, category:category, title:title})
    // this.props.navigation.navigate('EventList', { category, title });
  };

  renderCategory = ({ item }) => (

    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text>
      </View>
    </TouchableHighlight>

  );
  goBack=(item)=> {
     
  
    console.log("item clicked" , item)
    this.setState({selectedWalker:item, renderProfile:true})
    
  }

  render() {
    if(!this.state.renderEventList){
    return (
      <View style={{marginTop:40,}}>
      <Header name="Events" openDrawer={this.props.navigation.openDrawer}/>
        <FlatList
          data={categories}
          renderItem={this.renderCategory}
          keyExtractor={item => `${item.id}`}
        />
         <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
        </TouchableOpacity>
      </View>
    );
    }else{

      return (
             <EventList category={this.state.category} title={this.state.title} navigation={this.props.navigation}/>
      );

    }
  }
}
