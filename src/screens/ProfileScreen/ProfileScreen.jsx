import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const ProfileScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({});

  const validateFirstname = text => {
    setFirstname(text);
    const nameRegex = /^[A-Za-z\s]{3,10}$/;
    if (!nameRegex.test(text)) {
      setErrors(prev => ({
        ...prev,
        firstname:
          'First name can only contain letters and between 3 & 10 characters',
      }));
    } else {
      setErrors(prev => ({...prev, firstname: null}));
    }
  };

  const validateLastname = text => {
    setLastname(text);
    const nameRegex = /^[A-Za-z\s]{3,10}$/;
    if (!nameRegex.test(text)) {
      setErrors(prev => ({
        ...prev,
        lastname:
          'Last name can only contain letters and between 3 & 10 characters',
      }));
    } else {
      setErrors(prev => ({...prev, lastname: null}));
    }
  };

  const validateContact = text => {
    setContact(text);
    const phoneRegex = /^\d{10}$/;
    if (!text || !phoneRegex.test(text)) {
      setErrors(prev => ({
        ...prev,
        contact: 'Valid contact number is required',
      }));
    } else {
      setErrors(prev => ({...prev, contact: null}));
    }
  };

  const validateEmail = text => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text || !emailRegex.test(text)) {
      setErrors(prev => ({...prev, email: 'Valid email is required'}));
    } else {
      setErrors(prev => ({...prev, email: null}));
    }
  };

  const validateUsername = text => {
    setUsername(text);
    if (!text) {
      setErrors(prev => ({...prev, username: 'Username is required'}));
    } else {
      setErrors(prev => ({...prev, username: null}));
    }
  };

  const validatePassword = text => {
    setPassword(text);
    if (!text) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
    } else if (text.length < 6) {
      setErrors(prev => ({
        ...prev,
        password: 'Password must be at least 6 characters',
      }));
    } else {
      setErrors(prev => ({...prev, password: null}));
    }
  };

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been successfully logged out.');
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          value={firstname}
          onChangeText={validateFirstname}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.firstname && (
          <Text style={styles.errorText}>{errors.firstname}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="LastName"
          value={lastname}
          onChangeText={validateLastname}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.lastname && (
          <Text style={styles.errorText}>{errors.lastname}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Contact No."
          value={contact}
          onChangeText={validateContact}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.contact && (
          <Text style={styles.errorText}>{errors.contact}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={validateEmail}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={validateUsername}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          secureTextEntry
          value={password}
          onChangeText={validatePassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <View style={styles.updateButtonView}>
        <Pressable style={styles.updateButton}>
          <Text style={styles.updateButtonText}>
            Update <Icon name="update" size={20} color="#fff" />
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>
            Delete Account <Icon name="delete" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
          <Text style={styles.logOutButtonText}>
            Logout <Icon name="logout" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  inputView: {
    gap: 15,
    width: '100%',
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: '#0dcaff',
    backgroundColor: 'gray',
    color: 'white',
    borderWidth: 1,
    borderRadius: 7,
  },
  updateButton: {
    backgroundColor: '#f8b422',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateButtonView: {
    width: '100%',
    paddingHorizontal: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 20,
  },
  logOutButton: {
    backgroundColor: '#0af',
    height: 45,
    borderColor: 'gray',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    height: 45,
    borderColor: 'gray',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});
