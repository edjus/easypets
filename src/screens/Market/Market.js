import React from 'react';
import { FlatList, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { products, productCategories } from '../../database/dataArrays';
import { getProductCategoryName } from '../../database/MockDataAPI';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../components/Header';
export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProducts: products
    }
  }

  onPressProduct = item => {
    this.props.navigation.navigate('Product', { item });
  };

  renderProducts = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressProduct(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getProductCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  filterProducts = (categoryId) => {
    const filtered = (categoryId === 0 ? products : products.filter((product) => product.categoryId === categoryId));
    this.setState({filteredProducts: filtered});
  };

  renderproductCategories = () => {
    const allOptions = [...productCategories, {id: 0, name: 'all'}];
    return allOptions.map((category) => {
      return {label: category.name.toUpperCase(), value: category.id}
    })
  };

  render() {
    return (
      <View style={{marginTop:40}}>
      <Header name="Market" openDrawer={this.props.navigation.openDrawer}/>
        <DropDownPicker 
          items={this.renderproductCategories()}
          defaultValue={0}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => this.filterProducts(item.value)}
        />
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.filteredProducts}
          renderItem={this.renderProducts}
          keyExtractor={item => `${item.productId}`}
        />
      </View>
    );
  }
}

