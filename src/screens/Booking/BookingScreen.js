import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight, 
  Button
} from 'react-native';
import styles from './styles';
import { getCategoryName } from '../../database/MockDataAPI';
import { Card } from 'react-native-elements';
import { RadioGroup } from 'react-native-btr';
import CustomButton from '../../components/CustomButton/CustomButton';

import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class BookingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      payment: [
        {
          id: 1,
          label: 'VISA ending in 357',
          size: 20,
          color: "#00cc99",
          selected:true,
        },
        {
          id: 2,
          label: 'MASTERCARD ending in 879',
          size: 20,
          color: "#00cc99",
        },
      ],
      place: [
        {
          id: 1,
          label: 'Garden',
          size: 20,
          color: "#00cc99",
          selected:true,
        },
        {
          id: 2,
          label: 'Hall',
          size: 20,
          color: "#00cc99",
        },
      ],
      date: new Date(),
      mode: 'date',
      show: false,
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

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryName(item.categoryId);

    return (
      <ScrollView style={styles.container}>
        <Card>
          <Text style={styles.infoRecipe}>Booking information</Text>
          <Input
            placeholder='Capacity'
            leftIcon={
              <Icon
                name='paw'
                size={20}
                color='black'
              />
            }
          />
          <View>
            <View>
              <Text style={styles.infoDescriptionRecipe}>
                <Icon
                  name='calendar'
                  size={20}
                  color='black'
                  onPress={this.showDatepicker}
                />
                  {this.state.date.toDateString()}
              </Text>
            </View>
            <View>
              <Text style={styles.infoDescriptionRecipe}>
                <Icon
                  name='ambulance'
                  size={20}
                  color='black'
                  onPress={this.showTimepicker}
                />
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
                navigation.navigate('BuySuccess', {price: item.price});
              }}
              title="Buy"
            />
          </View>
      </ScrollView>
    );
  }
}