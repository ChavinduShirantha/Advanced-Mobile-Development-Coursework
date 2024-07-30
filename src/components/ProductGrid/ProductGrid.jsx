import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Product from '../Product/Product';

const products = require('../../assets/products.json');

const ProductGrid = () => {
  return (
    <FlatList
      data={products}
      renderItem={({item}) => <Product item={item} />}
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
