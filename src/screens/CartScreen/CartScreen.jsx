import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {CartContext} from '../../context/CartContext/CartContext';
import productImagesMappings from '../../assets/productImagesMappings';

export const CartScreen = () => {
  const {
    cartItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useContext(CartContext);

  const handleRemoveItem = id => {
    removeFromCart(id);
  };

  const handleIncrement = id => {
    incrementQuantity(id);
  };

  const handleDecrement = id => {
    decrementQuantity(id);
  };

  const getTotalPrice = () => {
    return [...cartItems.values()].reduce(
      (total, item) => total + item.price * item.count,
      0,
    );
  };

  const handlePurchaseOrder = () => {
    Alert.alert('Purchase Order', 'Your order has been placed successfully!', [
      {text: 'OK', onPress: () => clearCart()},
    ]);
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDescContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Image
          source={productImagesMappings[item.image]}
          style={styles.image}
        />
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>
          {item.price}
          {item.currency}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDecrement(item.id)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.count}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleIncrement(item.id)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[...cartItems.values()]}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {getTotalPrice()}.00 LKR</Text>
      </View>
      <TouchableOpacity
        style={styles.purchaseButton}
        onPress={handlePurchaseOrder}>
        <Text style={styles.purchaseButtonText}>Purchase Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8e8e8',
  },
  list: {
    marginBottom: 20,
  },
  image: {
    width: '50%',
    height: 180,
    borderRadius: 5,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 5,
  },
  itemDescContainer: {
    alignItems: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  itemDescription: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    width: 30,
    height: 30,
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
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  purchaseButton: {
    marginTop: 20,
    backgroundColor: '#01a120',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
