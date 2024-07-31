import {FlatList, Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {useFavourites} from '../../context/FavouriteContext/FavouriteContext';
import Product from '../../components/Product/Product';
import {useCart} from '../../context/CartContext/CartContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const FavoritesScreen = () => {
  const {favourites, removeFromFavourites} = useFavourites();
  const {addToCart} = useCart();

  const handleAddToCart = (product, count) => {
    addToCart(product, count);
  };

  const handleRemoveFromFavourites = productId => {
    removeFromFavourites(productId);
  };

  return (
    <View style={styles.container}>
      {favourites.length === 0 ? (
        <View style={styles.emptyFavouriteContainer}>
          <Icon name="favorite" size={80} color="#555" />
          <Text style={styles.emptyText}>No favourites yet!</Text>
        </View>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Product
              item={item}
              onAddToCart={handleAddToCart}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          )}
          contentContainerStyle={styles.grid}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  emptyFavouriteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});
