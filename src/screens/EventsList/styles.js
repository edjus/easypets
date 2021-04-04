import { StyleSheet } from 'react-native';
import { ProductCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: ProductCard.container,
  roundButton3: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    padding: 0,
    marginTop:5,
    alignSelf:'center',
    borderRadius: 100,
    backgroundColor: 'blue',
  },
  photo: ProductCard.photo,
  title: ProductCard.title,
  category: ProductCard.category
});

export default styles;
