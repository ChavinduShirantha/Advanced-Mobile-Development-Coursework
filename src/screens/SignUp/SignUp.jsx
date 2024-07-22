import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  Switch,
  Pressable,
  ImageBackground,
  Dimensions, ScrollView,
} from 'react-native';

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

  const handleSignUp = () => {
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
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Sign Up</Text>
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

        <View style={styles.buttonView}>
          <Pressable style={styles.button} onPress={() => handleSignUp()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
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
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signIn}>Sign In</Text>
          </Pressable>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  bg: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
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
});
