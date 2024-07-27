import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent';

const {screenWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CarouselComponent style={styles.carousel} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  carousel: {
    width: screenWidth,
    height: 200,
  },
});
