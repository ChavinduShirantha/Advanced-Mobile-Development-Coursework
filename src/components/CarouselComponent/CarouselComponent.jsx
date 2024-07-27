import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

const data = [
  {
    image: require('../../assets/img/home_banner1.jpg'),
  },
  {
    image: require('../../assets/img/home_banner2.jpg'),
  },
  {
    image: require('../../assets/img/home_banner3.jpg'),
  },
  {
    image: require('../../assets/img/home_banner4.jpg'),
  },
  {
    image: require('../../assets/img/home_banner5.jpg'),
  },
  {
    image: require('../../assets/img/home_banner6.jpg'),
  },
];

const CarouselComponent = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={true}
      autoplay={true}
      paginationStyle={styles.pagination}
      dotStyle={styles.dot}
      autoplayDelay={2000}
      autoplayInterval={5000}
      activeDotStyle={styles.activeDot}
    >
      {data.map((item, index) => (
        <View key={index} style={styles.slide}>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: width * 0.29,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pagination: {
    bottom: 10,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  activeDot: {
    backgroundColor: '#000',
  },
});

export default CarouselComponent;
