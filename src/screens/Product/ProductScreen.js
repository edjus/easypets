import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getProductCategoryName } from '../../database/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import CustomButton from '../../components/CustomButton/CustomButton';
import { Marker } from 'react-native-maps';
import Market from '../Market/Market'
import Payment from '../Payment/PaymentScreen'
import Header from '../../components/Header';
const { width: viewportWidth } = Dimensions.get('window');

export default class ProductScreen extends React.Component {
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
      activeSlide: 0,
      renderMarket:false,
      renderPayment:false,
      item:{}
    };
  }
  goBack=()=> {
     
    this.setState({renderMarket:true})
    
  }
  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  // onPressIngredient = item => {
  //   var name = getIngredientName(item);
  //   let ingredient = item;
  //   this.setState({renderPayment:true, ingredient:ingredient, name:name})
  //   this.props.navigation.navigate('Payment', { ingredient, name });
  // };
  goPayment =item=>{
    this.setState({renderPayment:true, item:item})
  }

  render() {
    if((!this.state.renderMarket) && (!this.state.renderPayment)){
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    // const item = navigation.getParam('item');
    const item=this.props.item;
    const category = getProductCategoryName(item.categoryId);

    return (
     
      <ScrollView style={styles.container}>
       <Header name="Market" openDrawer={this.props.navigation.openDrawer}/>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={c => {
                this.slider1Ref = c;
              }}
              data={item.photosArray}
              renderItem={this.renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={index => this.setState({ activeSlide: index })}
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this.slider1Ref}
              tappableDots={!!this.slider1Ref}
            />
          </View>
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.category}> {category.toUpperCase()}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/price.png')} />
            <Text style={styles.infoRecipe}>US$ {item.price} </Text>
          </View>

          <View style={styles.infoContainer}>
            <CustomButton
              title="Buy now"
              onPress={() => {
                // navigation.navigate('Payment', { item });
                this.goPayment(item);
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
          </View>
        </View>
        <TouchableOpacity  onPress={()=>this.goBack()}>
                <Image style={styles.roundButton3} source={require('../../../assets/back.png')}/>
        </TouchableOpacity>
      </ScrollView>
    );
  }else if(this.state.renderMarket){
    return(
    <Market navigation={this.props.navigation}/>
    )
  }else{
    return(
      <Payment  item={this.state.item} navigation={this.props.navigation}/>
    )
  }
  }
}