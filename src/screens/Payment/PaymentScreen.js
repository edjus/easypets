import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import { getProductCategoryName } from '../../database/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import { Card } from 'react-native-elements';
import { RadioGroup } from 'react-native-btr';
import CustomButton from '../../components/CustomButton/CustomButton';
import BuySuccess from '../BuySuccessScreen';
import Product from '../Product/ProductScreen'
import Header from '../../components/Header';
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
      renderBuySuccess:false,
      renderProduct:false,
      price:''
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
  renderBuySuccessScreen=(price)=>{
    console.log("clicked render buy successs")
    this.setState({price:price, renderBuySuccess:true})
  }
  goBack=(item)=> {
     
    this.setState({renderProduct:true })
    
  }
  render() {
    if((!this.state.renderBuySuccess) &&(!this.state.renderProduct)){
    const { navigation } = this.props;
    // const item = navigation.getParam('item');
    const item=this.props.item;
    const category = getProductCategoryName(item.categoryId);

    return (
      <ScrollView style={styles.container}>
       <Header name="Market" openDrawer={this.props.navigation.openDrawer}/>
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
            <CustomButton
              onPress={() => {
               // navigation.navigate('BuySuccess', {price: item.price});
               this.renderBuySuccessScreen(item.price) 
              }}
              title="Buy"
            />
          </View>
          <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
        </TouchableOpacity>
      </ScrollView>
    );}
    else if(this.state.renderBuySuccess){
      return(
        <BuySuccess precio={this.state.price}/>
      )
    }else{
      return(
        <Product item={this.props.item} navigation={ this.props.navigation}/>
      )
    }
  }
}