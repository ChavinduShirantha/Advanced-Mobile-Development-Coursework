/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import {SafeAreaView, ScrollView} from 'react-native';
import {SignIn} from './src/components/SignIn/SignIn';
import {SignUp} from './src/components/SignUp/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
    /*<SafeAreaView>
      <ScrollView>
        <SignIn />
        <SignUp />
      </ScrollView>
    </SafeAreaView>*/
  );
}

export default App;
