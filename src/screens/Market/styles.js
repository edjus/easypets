import { StyleSheet } from 'react-native';
import { ProductCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: ProductCard.container,
  photo: ProductCard.photo,
  title: ProductCard.title,
  category: ProductCard.category,
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default styles;
