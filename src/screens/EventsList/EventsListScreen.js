import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { getCategoryName, getEvents } from '../../database/MockDataAPI';
import Header from '../../components/Header';
import Event  from '../Event/EventScreen'
import Events  from '../Events/EventsScreen'
export default class EventsListScreen extends React.Component {

  constructor(props) {
    super(props);
  }
  state={
    renderEvent:false,
    renderEvents:false,
    item:{}
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Event', { item });
    this.setState({renderEvent:true, item:item})
  };

  goBack=()=> {
     
    this.setState({renderEvents:true})
    
  }
  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    // const { navigation } = this.props;
    // const item = navigation.getParam('category');
    if((!this.state.renderEvent)&&(!this.state.renderEvents)){
    const item= this.props.category;
    const recipesArray = getEvents(item.id);
    return (
      <View style={{marginTop:40}}>
      <Header name="Events" openDrawer={this.props.navigation.openDrawer}/>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipesArray}
          renderItem={this.renderRecipes}
          keyExtractor={item => `${item.recipeId}`}
        />
          <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
        </TouchableOpacity>
      </View>
    );
    }else if(this.state.renderEvent){
      return(
        <Event item={this.state.item}   category={this.props.category} navigation={this.props.navigation}/>
      )

    }else{
      return(
        <Events  navigation={this.props.navigation}/>
      )
    }
  
}
}
