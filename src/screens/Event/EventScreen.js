import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../database/MockDataAPI';
import CustomButton from '../../components/CustomButton/CustomButton';
import Header from '../../components/Header';
const { width: viewportWidth } = Dimensions.get('window');
import EventList  from '../EventsList/EventsListScreen'
import Boocking from '../Booking/BookingScreen'


export default class EventScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      renderEventList:false,
      category:this.props.category,
      title:this.props.title,
      renderIngredient:false,
      renderBooking:false,
      item:{}
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };
  goBack=(item)=> {
     
    this.setState({renderEventList:true })
    
  }
  renderBooking=(item)=>{
    this.setState({renderBooking:true, item:item})
  }

  render() {
    if((!this.state.renderEventList)&&(!this.state.renderBooking )){
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    // const item = navigation.getParam('item');
    const item= this.props.item
    const category = getCategoryById(item.categoryId);
    const title = getCategoryName(category.id);

    return (
 
  
      <ScrollView style={styles.container}>
          <Header name="Events" openDrawer={this.props.navigation.openDrawer}/>
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
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', { category, title })}
            >
              <Text style={styles.category}>{getCategoryName(item.categoryId).toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/price.png')} />
            <Text style={styles.infoRecipe}>US$ {item.price} </Text>
          </View>

          <View style={styles.infoContainer}>
            <CustomButton
              title="Booking"
              onPress={() => {
                this.renderBooking(item)

                // navigation.navigate('Booking', { item });
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
  }else if(!this.state.renderBooking){
    return(<EventList category={this.props.category} title={this.props.title} navigation={this.props.navigation}/>)
  }else{
    return(<Boocking  item={this.state.item}   category={this.props.category} navigation={this.props.navigation}/>)
  }
}
}
