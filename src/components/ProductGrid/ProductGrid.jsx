import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Product from '../Product/Product';
import {CartContext} from '../../context/CartContext/CartContext';
import {useFavourites} from '../../context/FavouriteContext/FavouriteContext';

const products = require('../../assets/products.json');

const ProductGrid = () => {
  const {favourites, onAddToFavourites, removeFromFavourites} = useFavourites();
  const {addToCart} = useContext(CartContext);

  const handleAddToCart = (product, count) => {
    addToCart(product, count);
  };

  const handleAddToFavourites = product => {
    onAddToFavourites(product);
  };

  const handleRemoveFromFavourites = productId => {
    removeFromFavourites(productId);
  };

  const isFavourite = product => {
    return favourites.some(fav => fav.id === product.id);
  };

  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <Product
          item={item}
          onAddToFavourites={handleAddToFavourites}
          onRemoveFromFavourites={handleRemoveFromFavourites}
          onAddToCart={handleAddToCart}
          isItemFavourite={isFavourite(item)}
        />
      )}
      keyExtractor={item => item.id}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default ProductGrid;
