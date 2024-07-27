/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SignIn} from './src/screens/SignIn/SignIn';
import {SignUp} from './src/screens/SignUp/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeNavigation} from './src/screens/TabNavigateScreen/HomeNavigation';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
