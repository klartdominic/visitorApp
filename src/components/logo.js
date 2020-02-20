import React from 'react';
import {Image, View, Text} from 'react-native';
import styles from '.././styles/styles';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.images}
        source={require('.././images/sprobe_logo.png')}
      />
      <Text style={styles.logoText}>Welcome to Sprobe</Text>
    </View>
  );
};
export default Logo;
