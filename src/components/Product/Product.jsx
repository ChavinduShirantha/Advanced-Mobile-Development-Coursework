import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Product = ({item, onFavourite, isFavourite, onAddToCart}) => {
  const imageSource = getImageSource(item.image);
  const productStateSource = getProductStateSource(item.productState);
  const [count, setCount] = useState(0);
  const [isCartMode, setIsCartMode] = useState(false);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onAddToCart(item, newCount);
  };

  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      onAddToCart(item, newCount);
    } else {
      setIsCartMode(false);
      setCount(0);
    }
  };

  const handleAddToCart = () => {
    setIsCartMode(true);
    handleIncrement();
  };

  return (
    <View style={styles.productContainer}>
      <Image source={productStateSource} style={styles.productState} />
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>
        {item.price}
        {item.currency}
      </Text>
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={() => onFavourite(item)}>
        <Icon name="favorite" size={24} color={isFavourite ? 'red' : 'gray'} />
      </TouchableOpacity>
      <View style={styles.cartContainer}>
        {!isCartMode ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={handleDecrement}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity style={styles.button} onPress={handleIncrement}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const productWidth = screenWidth / 2 - 20;

const getImageSource = imageName => {
  switch (imageName) {
    case 'product1.jpg':
      return require('../../assets/img/products/product1.jpg');
    case 'product2.jpg':
      return require('../../assets/img/products/product2.jpg');
    case 'product3.jpg':
      return require('../../assets/img/products/product3.jpg');
    case 'product4.jpg':
      return require('../../assets/img/products/product4.jpg');
    case 'product5.jpg':
      return require('../../assets/img/products/product5.jpg');
    case 'product6.jpg':
      return require('../../assets/img/products/product6.jpg');
    case 'product7.jpg':
      return require('../../assets/img/products/product7.jpg');
    case 'product8.jpg':
      return require('../../assets/img/products/product8.jpg');
    case 'product9.jpg':
      return require('../../assets/img/products/product9.jpg');
    case 'product10.jpg':
      return require('../../assets/img/products/product10.jpg');
    case 'product11.jpg':
      return require('../../assets/img/products/product11.jpg');
    default:
      return require('../../assets/img/products/product1.jpg');
  }
};

const getProductStateSource = imageName => {
  switch (imageName) {
    case 'in_stock.png':
      return require('../../assets/img/product-state/in_stock.png');
    case 'out_of_stock.png':
      return require('../../assets/img/product-state/out_of_stock.png');
    case 'new_arrivals.png':
      return require('../../assets/img/product-state/new_arrivals.png');
    case 'coming_soon.png':
      return require('../../assets/img/product-state/coming_soon.png');
    default:
      return require('../../assets/img/product-state/new_arrivals.png');
  }
};

const styles = StyleSheet.create({
  productContainer: {
    width: productWidth,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(70,70,70,0.9)',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 5,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productState: {
    position: 'absolute',
    width: '30%',
    height: 50,
    borderRadius: 5,
    left: 0,
    zIndex: 2,
  },
  name: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: '#cfd4da',
  },
  addToCartButton: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2cc1fc',
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  favouriteButton: {
    margin: 10,
    position: 'absolute',
    zIndex: 10,
    right: 0,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#2cc1fc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  count: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cfd4da',
  },
});

export default Product;
