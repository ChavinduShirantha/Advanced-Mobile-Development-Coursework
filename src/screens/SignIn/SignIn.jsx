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
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
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

export const SignIn = ({navigation}) => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bg}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder="EMAIL OR USERNAME"
            value={username}
            onChangeText={setUsername}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.rememberView}>
          <View style={styles.switch}>
            <Switch
              value={click}
              onValueChange={setClick}
              trackColor={{true: 'green', false: 'gray'}}
            />
            <Text style={styles.rememberText}>Remember Me</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => Alert.alert('Forget Password!')}>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomeNavigation')}>
            <Text style={styles.buttonText}>
              LOGIN <Icon name="login" size={20} color="#fff" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.optionsText}>OR LOGIN WITH</Text>
        </View>

        <View style={styles.mediaIcons}>
          <Image source={linkedin} style={styles.icons} />
          <Image source={whatsapp} style={styles.icons} />
          <Image source={twitter} style={styles.icons} />
          <Image source={instagram} style={styles.icons} />
          <Image source={facebook} style={styles.icons} />
        </View>

        <Text style={styles.footerText}>
          Don't Have Account?
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </ImageBackground>
    </SafeAreaView>
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
  rememberView: {
    width: '100%',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  switch: {
    flexDirection: 'row',
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 13,
    color: 'gray',
  },
  forgetText: {
    fontSize: 11,
    color: 'gray',
  },
  button: {
    backgroundColor: '#0af',
    height: 45,
    borderColor: 'gray',
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
  signup: {
    marginLeft: 10,
    color: '#0af',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
