import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import CarouselComponent from '../../components/CarouselComponent/CarouselComponent';

const {screenWidth} = Dimensions.get('window');

export const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <CarouselComponent style={styles.carousel} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  carousel: {
    width: screenWidth,
    height: 200,
  },
});
