import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';

export const ProfileScreen = ({navigation, route}) => {
  const [firstname, setFirstname] = useState(route.params.firstname || '');
  const [lastname, setLastname] = useState(route.params.lastname || '');
  const [contact, setContact] = useState(route.params.contact || '');
  const [address, setAddress] = useState(route.params.address || '');
  const [username, setUsername] = useState(route.params.username || '');
  const [password, setPassword] = useState(route.params.password || '');
  const [email, setEmail] = useState(route.params.email || '');

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
        const addressRegex = /^[A-Za-z\s]{3,10}$/;
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

  const handleOnUpdate = async () => {
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
        const updatedData = {
          firstname,
          lastname,
          contact,
          address,
          email,
          username,
          password,
        };

        const path = RNFS.DocumentDirectoryPath + '/signupData.json';
        const fileExists = await RNFS.exists(path);

        if (fileExists) {
          const existingData = await RNFS.readFile(path);
          const existingDataParsed = JSON.parse(existingData);

          const userIndex = existingDataParsed.findIndex(
            user => user.username === username,
          );

          if (userIndex === -1) {
            console.log('User not found. Please check the username.');
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'User not found. Please check the username.',
            });
            return;
          }

          existingDataParsed[userIndex] = updatedData;

          await RNFS.writeFile(
            path,
            JSON.stringify(existingDataParsed),
            'utf8',
          );

          console.log('Profile updated successfully!');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Profile updated successfully!',
          });
          setFirstname('');
          setLastname('');
          setContact('');
          setAddress('');
          setEmail('');
          setUsername('');
          setPassword('');
          await fetchUserData();
        } else {
          console.log('No user data found to update.');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No user data found to update.',
          });
        }
      } catch (error) {
        console.error(error);
        console.log('Error updating data');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error updating data',
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

  const getUser = async username => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/signupData.json';
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        const existingData = await RNFS.readFile(path);
        const existingDataParsed = JSON.parse(existingData);

        const user = existingDataParsed.find(
          user => user.username === username,
        );

        if (user) {
          console.log('User Data:', user);
          return user;
        } else {
          console.log('User not found.');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'User not found.',
          });
          return null;
        }
      } else {
        console.log('No user data found.');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No user data found.',
        });
        return null;
      }
    } catch (error) {
      console.error(error);
      console.log('Error retrieving user data');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error retrieving user data',
      });
      return null;
    }
  };

  const fetchUserData = async () => {
    const username = route.params.username; // Replace with actual username
    const user = await getUser(username);

    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setContact(user.contact);
      setAddress(user.address);
      setEmail(user.email);
      setUsername(user.username);
      setPassword(user.password);
      console.log('Fetched User Data:', user);
    }
  };

  const deleteUser = async username => {
    try {
      const path = RNFS.DocumentDirectoryPath + '/signupData.json';
      const fileExists = await RNFS.exists(path);

      if (fileExists) {
        // Read the existing file
        const existingData = await RNFS.readFile(path);
        const existingDataParsed = JSON.parse(existingData);

        // Find the index of the user to delete
        const userIndex = existingDataParsed.findIndex(
          user => user.username === username,
        );

        if (userIndex === -1) {
          console.log('User not found.');
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'User not found. ',
          });
          return;
        }

        existingDataParsed.splice(userIndex, 1);

        await RNFS.writeFile(path, JSON.stringify(existingDataParsed), 'utf8');

        console.log('User Account deleted successfully!');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'User Account deleted successfully!',
        });
        navigation.navigate('SignIn');
      } else {
        console.log('No user data found.');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No user data found. ',
        });
      }
    } catch (error) {
      console.error(error);
      console.log('Error deleting user data');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error deleting user data .',
      });
    }
  };

  const handleOnDelete = async () => {
    const username = route.params.username; // Replace with actual username
    await deleteUser(username);
  };

  const handleLogout = () => {
    console.log('Logged out', 'You have been successfully logged out.');
    Toast.show({
      type: 'success',
      text1: 'Logged out',
      text2: 'You have been successfully logged out.',
    });
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.inputView}>
        <Text style={styles.greet}>Welcome, {username}!</Text>
        <TextInput
          style={styles.input}
          placeholder="FirstName"
          value={firstname}
          onChangeText={text => validateInput(text, 'firstname', setFirstname)}
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
          onChangeText={text => validateInput(text, 'lastname', setLastname)}
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
          onChangeText={text => validateInput(text, 'address', setAddress)}
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
          onChangeText={text => validateInput(text, 'email', setEmail)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="USERNAME"
          value={username}
          onChangeText={text => validateInput(text, 'username', setUsername)}
          autoCorrect={false}
          editable={false}
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

      <View style={styles.updateButtonView}>
        <TouchableOpacity style={styles.updateButton} onPress={handleOnUpdate}>
          <Text style={styles.updateButtonText}>
            Update <Icon name="update" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleOnDelete}>
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
  greet: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0af',
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
