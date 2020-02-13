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
import { fetchData } from '../storage/database';

class VistorLog extends Component {
  constructor(){
    super()

    // this.state=({
    //   DATA: [],
    // })
  };

  componentDidMount(){
    // this.getData();
    // this._navListener = [
    //   this.props.navigation.addListener('willFocus', () => {
    // // get your new data here and then set state it will rerender
    //   this.getData();
    //   console.log(this.state.DATA);
    // })
    // ];

    // if(this.props.navigation.isFocused()){
    //   this.getData();
    //   console.log('isfocused');
    // }
  };

  // componentWillUnmount() {
    // this._navListener.forEach( item => item.remove() )
  // }
  // getData = async () => {
  //   let DATA = await fetchData();
  //   this.setState({DATA});
  // };


  render(){
    return(
      // this.getData(),
      <KeyboardAwareScrollView 
        innerRef={ref => {
          this.scroll = ref
        }}
        extraHeight= {10}
        extraScrollHeight={10}
        automaticallyAdjustContentInsets={false}
      >
      <View style={styles.homeContainer}>
        <ClockScreen />
        <LogListScreen that={this}/>
        <CopyrightScreen /> 
      </View>
      </KeyboardAwareScrollView>
    );
  };
}

export default VistorLog;

