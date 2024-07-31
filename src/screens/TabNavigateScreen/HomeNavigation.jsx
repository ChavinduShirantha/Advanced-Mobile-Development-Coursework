import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../HomeScreen/HomeScreen';
import {ProfileScreen} from '../ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CartScreen} from '../CartScreen/CartScreen';
import {FavoritesScreen} from '../FavoritesScreen/FavoritesScreen';
import {CartProvider} from '../../context/CartContext/CartContext';

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={{
          headerTitleAlign: 'center', // Center the title
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        {/*<Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="favorite" color={color} size={size} />
          ),
        }}
      />*/}
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </CartProvider>
  );
};
