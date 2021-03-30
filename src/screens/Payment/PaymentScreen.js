import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { getCategoryName } from '../../database/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import BuyProductButton from '../../components/BuyProductButton/BuyProductButton';
import { Card } from 'react-native-elements';
import { RadioGroup } from 'react-native-btr';

export default class PaymentScreen extends React.Component {
  
  // FIXME: No funciona el volver (no aparece)
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          label: 'VISA ending in 357',
          size: 32,
          color: "#00cc99",
          selected:true,
        },
        {
          id: 2,
          label: 'MASTERCARD ending in 879',
          size: 32,
          color: "#00cc99",
        },
      ],
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

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    const category = getCategoryName(item.categoryId);

    return (
      <ScrollView style={styles.container}>
        <Card>
          <Text style={styles.infoRecipe}>Address</Text>
          <Text style={styles.infoDescriptionRecipe}>
            Suipacha 245 - 3, C.P. 1008 - San Nicolás, Capital Federal
            - Pedro Sánchez - 01164053378
          </Text>
        </Card>
        <Card>
          <Text style={styles.infoRecipe}>Details</Text>
          <Text style={styles.infoDescriptionRecipe}>{item.title} - {category}</Text>
          <Text style={styles.infoDescriptionRecipe}>US$ {item.price} </Text>
          <Text style={styles.infoDescriptionRecipe}>Free deliver - arrives in 24 hours</Text>
        </Card>

        <Card>
          <Text style={styles.infoRecipe}>Payment Card</Text>
          <RadioGroup 
            radioButtons={this.state.data}
            onPress={this.onPress}
          />
        </Card>

          <View style={styles.infoContainer}>
            <BuyProductButton
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