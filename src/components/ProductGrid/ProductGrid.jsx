import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Product from '../Product/Product';

const products = require('../../assets/products.json');

const ProductGrid = () => {
  const [favourites, setFavourites] = useState(new Set());

  const handleFavourite = product => {
    setFavourites(prevFavourites => {
      const newFavourites = new Set(prevFavourites);
      if (newFavourites.has(product.id)) {
        newFavourites.delete(product.id);
      } else {
        newFavourites.add(product.id);
      }
      return newFavourites;
    });
  };

  const isFavourite = product => {
    return favourites.has(product.id);
  };

  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <Product
          item={item}
          onFavourite={handleFavourite}
          isFavourite={isFavourite(item)}
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
