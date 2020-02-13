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
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';
import LogListScreen from '.././components/logList';

class VistorLog extends Component {
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
      {/* {console.log(this)} */}
        <ClockScreen />
        <LogListScreen />
        <CopyrightScreen /> 
      </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default VistorLog;

