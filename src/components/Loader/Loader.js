import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {useLoader} from '../../context/LoaderContext/LoaderContext';

const loaderLogo = require('../../assets/img/logo.png'); // Update path if necessary

const Loader = () => {
  const {loading} = useLoader();

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={loading}
      onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.loaderContainer}>
          <Image source={loaderLogo} style={styles.loaderImage} />
          <ActivityIndicator size="large" color="#0af" style={styles.loader} />
          <Text style={styles.loaderText}>Logging in...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    width: 200,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 10,
    padding: 20,
  },
  loaderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  loaderText: {
    marginTop: 10,
    color: '#046d9f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    transform: [{scale: 1.5}],
  },
});

export default Loader;
