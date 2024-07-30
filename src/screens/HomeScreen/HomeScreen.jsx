import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent';
import ProductGrid from '../../components/ProductGrid/ProductGrid';

const {screenWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <CarouselComponent style={styles.carousel} />
        <ProductGrid />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    width: screenWidth,
    height: 200,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});
