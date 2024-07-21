import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ProfileScreen = ({navigation}) => {
  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been successfully logged out.');
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>
            Logout <Icon name="logout" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0af',
    height: 45,
    borderColor: 'gray',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '30%',
  },
});
