import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';

const logo = require('../../assets/img/tulip_logo.png');
const bg = require('../../assets/img/main_bg.jpg');

const linkedin = require('../../assets/img/linkedin.png');
const whatsapp = require('../../assets/img/whatsapp.png');
const twitter = require('../../assets/img/twitter.png');
const instagram = require('../../assets/img/instagram.png');
const facebook = require('../../assets/img/facebook.png');

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const SignUp = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const validateInput = (text, type, updateState) => {
    let errorMessage = null;
    switch (type) {
      case 'firstname':
      case 'lastname':
        const nameRegex = /^[A-Za-z\s]{3,10}$/;
        if (!nameRegex.test(text)) {
          errorMessage = `${
            type === 'firstname' ? 'First' : 'Last'
          } name can only contain letters and be between 3 & 10 characters`;
        }
        break;
      case 'contact':
        const phoneRegex = /^\d{10}$/;
        if (!text || !phoneRegex.test(text)) {
          errorMessage = 'Valid contact number is required';
        }
        break;
      case 'address':
        const addressRegex = /^[A-Za-z\s]{5,20}$/;
        if (!addressRegex.test(text)) {
          errorMessage = "Address can't contain belows 5 characters";
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!text || !emailRegex.test(text)) {
          errorMessage = 'Valid email is required';
        }
        break;
      case 'username':
        if (!text) {
          errorMessage = 'Username is required';
        }
        break;
      case 'password':
        if (!text) {
          errorMessage = 'Password is required';
        } else if (text.length < 6) {
          errorMessage = 'Password must be at least 6 characters';
        }
        break;
      default:
        break;
    }
    setErrors(prev => ({...prev, [type]: errorMessage}));
    if (updateState) {
      updateState(text);
    }
  };

  const handleSignUp = async () => {
    if (
      !firstname ||
      !lastname ||
      !contact ||
      !address ||
      !email ||
      !username ||
      !password
    ) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Input fields cannot be empty.',
      });
      return;
    }
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.contact &&
      !errors.address &&
      !errors.email &&
      !errors.username &&
      !errors.password
    ) {
      try {
        const signupData = {
          firstname,
          lastname,
          contact,
          address,
          email,
          username,
          password,
        };

        const path = RNFS.DocumentDirectoryPath + '/signupData.json';
        // console.log('File path:', path);
        // Check if the file already exists
        const fileExists = await RNFS.exists(path);
        if (fileExists) {
          // Read the existing file
          const existingData = await RNFS.readFile(path);
          const existingDataParsed = JSON.parse(existingData);

          // Check if the username or email already exists
          const usernameExists = existingDataParsed.some(
            user => user.username === username,
          );
          const emailExists = existingDataParsed.some(
            user => user.email === email,
          );

          if (usernameExists) {
            console.log(
              'Username already exists. Please choose a different one.',
            );
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'Username already exists. Please choose a different one.',
            });
            return;
          }

          if (emailExists) {
            console.log(
              'Email already exists. Please use a different email address.',
            );
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2:
                'Email already exists. Please use a different email address.',
            });
            return;
          }

          // Append new data
          existingDataParsed.push(signupData);

          // Write the updated data
          await RNFS.writeFile(
            path,
            JSON.stringify(existingDataParsed),
            'utf8',
          );
        } else {
          // Create the file and write data
          await RNFS.writeFile(path, JSON.stringify([signupData]), 'utf8');
        }

        console.log('Sign Up Successfully!');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Sign Up Successfully!',
        });
        navigation.navigate('SignIn');

        setFirstname('');
        setLastname('');
        setContact('');
        setAddress('');
        setEmail('');
        setUsername('');
        setPassword('');
      } catch (error) {
        console.error(error);
        console.log('Error saving data');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error saving data',
        });
      }
    } else {
      console.log('Please correct the errors');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please correct the errors',
      });
    }
  };

  /*  const handleSignUp = async () => {
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.contact &&
      !errors.email &&
      !errors.username &&
      !errors.password
    ) {
      try {
        const signupData = {
          firstname,
          lastname,
          contact,
          username,
          password,
          email,
        };

        // Save data to AsyncStorage
        await AsyncStorage.setItem('signupData', JSON.stringify(signupData));
        Alert.alert('Sign Up Successfully!');
      } catch (error) {
        Alert.alert('Error saving data');
      }
    } else {
      Alert.alert('Please correct the errors');
    }
  };*/

  /*const handleSignUp = async () => {
    if (
      !errors.firstname &&
      !errors.lastname &&
      !errors.contact &&
      !errors.email &&
      !errors.username &&
      !errors.password
    ) {
      Alert.alert('Sign Up Successfully!');
    } else {
      Alert.alert('Please correct the errors');
    }
  };*/

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled">
        <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
          <Image source={logo} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="FirstName"
              value={firstname}
              onChangeText={text =>
                validateInput(text, 'firstname', setFirstname)
              }
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
              onChangeText={text =>
                validateInput(text, 'lastname', setLastname)
              }
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
              onChangeText={text => validateInput(text, 'contact', setContact)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.contact && (
              <Text style={styles.errorText}>{errors.contact}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={text =>
                validateInput(text, 'address', setAddress)
              }
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={text => validateInput(text, 'email', setEmail)}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="USERNAME"
              value={username}
              onChangeText={text =>
                validateInput(text, 'username', setUsername)
              }
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            {/*<TextInput
            style={styles.input}
            placeholder="PASSWORD"
            secureTextEntry
            value={password}
            onChangeText={text => validateInput(text, 'password', setPassword)}
            autoCorrect={false}
            autoCapitalize="none"
          />*/}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.optionsText}>OR Sign Up WITH</Text>
          </View>

          <View style={styles.mediaIcons}>
            <Image source={linkedin} style={styles.icons} />
            <Image source={whatsapp} style={styles.icons} />
            <Image source={twitter} style={styles.icons} />
            <Image source={instagram} style={styles.icons} />
            <Image source={facebook} style={styles.icons} />
          </View>

          <Text style={styles.footerText}>
            Do Have Account?
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signIn}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bg: {
    padding: 10,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 40,
    color: '#0af',
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
  button: {
    backgroundColor: '#0af',
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: 'gray',
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 40,
  },
  signIn: {
    marginLeft: 10,
    color: '#0af',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 20,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
