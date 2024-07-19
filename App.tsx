/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {SignIn} from './src/components/SignIn/SignIn.jsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ScrollView>
        <SignIn />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
