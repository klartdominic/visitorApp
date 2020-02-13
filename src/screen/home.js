import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import FormScreen from '.././components/form';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';

class Home extends Component {
  render(){
    
    return(
      <KeyboardAwareScrollView 
        innerRef={ref => {
          this.scroll = ref
        }}
        extraHeight= {10}
        extraScrollHeight={10}
        automaticallyAdjustContentInsets={false}
      >
      <View style={styles.homeContainer}>
        <LogoScreen />
        <ClockScreen />
        <FormScreen /> 
        <CopyrightScreen /> 
      </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default Home;

