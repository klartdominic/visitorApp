import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AppState,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';
import LogListScreen from '.././components/logList';
import { fetchData } from '../storage/database';
import AsyncStorage from "@react-native-community/async-storage";

class VistorLog extends Component {
  constructor(props){
    super(props)
    this.state=({
      DATA: [],
      isLoading: true,
    })
  };

  componentDidMount() {
    this.getData();
    console.log(this)
    if(this.props.navigation.isFocused()){
      console.log('isfocused',this)
      // console.log('navigation addlistener',  this.props.navigation.addlistener())
      this.getData();
    }
  };

  getData = async() => {
    let DATA = await fetchData();
    this.setState({DATA});
  };

  render(){
    return(
      // this.getData(),
      // <KeyboardAwareScrollView 
      //   innerRef={ref => {
      //     this.scroll = ref
      //   }}
      //   extraHeight= {10}
      //   extraScrollHeight={10}
      //   automaticallyAdjustContentInsets={false}
      // >
      <View style={styles.homeContainer}>
        <ClockScreen />
        {this.state.DATA ? <LogListScreen data={this.state.DATA} navigator={this.props.navigation}/> : <Text>No Visitor</Text> }
        {/* <LogListScreen data={this.state.DATA} navigator={this.props.navigation}/>  */}
        <CopyrightScreen /> 
      </View>
      // </KeyboardAwareScrollView>
    );
  };
};

export default VistorLog;

