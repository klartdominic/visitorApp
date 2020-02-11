import React, { Component } from 'react';
import { 
  View,
  Text,
} from 'react-native';
import styles from '.././styles/styles';

export default class Logo extends Component{
  render(){
    return(
      <View style={styles.logoContainer}>
        <Text
          style={styles.copyright}
        >Copyright ©  2020. Sprobe Inc. All Rights Reserved.</Text>
      </View>
    );
  }
}
