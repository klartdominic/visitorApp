import React, { Component } from 'react';
import { 
  Image, 
  View,
  Text,
} from 'react-native';
import styles from '.././styles/styles';

export default class Logo extends Component{

  componentDidmount(){
    styles = new styles();
  }

  render(){
    let uri = '.././images/sprobe_logo.png';
    return (
      <View style={styles.logoContainer}>
        <Image style={styles.images} source={require(uri)} />
        <Text style={styles.logoText}>Welcome to Sprobe</Text>
      </View>
    );
  }
}
