import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight, 
  Button,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { getCategoryName } from '../../database/MockDataAPI';
import { Card } from 'react-native-elements';
import { RadioGroup } from 'react-native-btr';
import CustomButton from '../../components/CustomButton/CustomButton';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import BuySuccess from '../BuySuccessScreen'
import Event from '../Event/EventScreen'
import Header from '../../components/Header';
export default class BookingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      payment: [
        {
          id: 1,
          label: 'VISA ending in 357',
          size: 20,
          color: "#042d6e",
          selected:true,
        },
        {
          id: 2,
          label: 'MASTERCARD ending in 879',
          size: 20,
          color: "#042d6e",
        },
      ],
      place: [
        {
          id: 1,
          label: 'Outdoor',
          size: 20,
          color: "#042d6e",
          selected:true,
        },
        {
          id: 2,
          label: 'Indoor',
          size: 20,
          color: "#042d6e",
        },
      ],
      date: new Date(),
      mode: 'date',
      show: false,
      renderBuySuccess:false,
      price:'',
      renderEvent:false
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPress = data => this.setState({ data });

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const newState = {...this.state, date: currentDate, show: false};
    this.setState(newState);
  };

  showMode = (currentMode) => {
    const newState = {...this.state, show: true, mode: currentMode};
    this.setState(newState);
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  renderBuySuccessScreen=(price)=>{

    this.setState({price:price, renderBuySuccess:true})
  }
  goBack=(item)=> {
     
    this.setState({renderEvent:true })
    
  }

  render() {
    if((!this.state.renderBuySuccess)&& (!this.state.renderEvent)){
    const { navigation } = this.props;
    //const item = navigation.getParam('item');
    const item=this.props.item
    const category = getCategoryName(item.categoryId);

    return (
      <ScrollView style={styles.container}>
      <Header name="Events" openDrawer={this.props.navigation.openDrawer}/>
        <Card>
          <Text style={styles.infoRecipe}>Booking information</Text>
          <Input
            placeholder='Capacity'
            leftIcon={
              <Icon
                name='paw'
                size={20}
                color='#042d6e'
              />
            }
          />
          <View>
            <View style={styles.rowContainer}>
                <Icon
                  name='calendar'
                  size={20}
                  color='#042d6e'
                  style={{marginRight: 10}}
                  onPress={this.showDatepicker}
                />
              <Text style={styles.infoDescriptionRecipe} onPress={this.showDatepicker}>
                  {this.state.date.toDateString()}
                </Text>
            </View>
            <View style={styles.rowContainer}>
              <Icon
                name='clock-o'
                size={20}
                color='#042d6e'
                onPress={this.showTimepicker}
                style={{marginRight: 10}}
              />
              <Text style={styles.infoDescriptionRecipe} onPress={this.showTimepicker}>
                {this.state.date.toLocaleTimeString()}
              </Text>
            </View>
            {this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
          </View>
        </Card>
        <Card>
          <Text style={styles.infoRecipe}>Details</Text>
          <Text style={styles.infoDescriptionRecipe}>{item.title} - {category}</Text>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          <Text style={styles.infoDescriptionRecipe}>US$ {item.price} </Text>
          <Card.Divider/>
          <Text style={styles.infoRecipe}>Place </Text>
          <RadioGroup 
            radioButtons={this.state.place}
            onPress={this.onPress}
          />
        </Card>
        <Card>
          <Text style={styles.infoRecipe}>Payment Card</Text>
          <RadioGroup 
            radioButtons={this.state.payment}
            onPress={this.onPress}
          />
        </Card>

          <View style={styles.infoContainer}>
            <CustomButton
              onPress={() => {
                //navigation.navigate('BuySuccess', {price: item.price});
                this.renderBuySuccessScreen(item.price)
              }}
              title="Buy"
            />
          </View>
          <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
        </TouchableOpacity>
      </ScrollView>
       );
    }else if (!this.state.renderEvent){
      return(
        <BuySuccess precio={this.state.price} navigation={this.props.navigation}/>
      )
    }else{
      return(
        <Event item={this.props.item} category={this.props.category} navigation={this.props.navigation}/>
      )
    }
   
  }
}