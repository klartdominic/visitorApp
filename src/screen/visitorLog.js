import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AppState,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';
import LogListScreen from '.././components/logList';
import { fetchData, saveData } from '../storage/database';

class VistorLog extends Component {
  constructor(props){
    super(props)
    this.state=({
      DATA: [],
      isLoading: true,
      externalData: null,
    })
  }

  getData = async() => {
    await fetchData().then(DATA => this.setState({DATA}));
    this.setPause();
  };

  setPause = () => {
    setInterval(() => {
      this.setState({
        isLoading: true,
      });
    }, 3000);
    this.setState({isLoading: false});
  };

  validateRemoveItem = (item) => {
    Alert.alert(
      'Logout',
      `Confirm to Logout ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.removeItem(item);
          },
        },
      ],
      {cancelable: true},
    )
  };

  removeItem = (item) => {
    let prevData = [...this.state.DATA];
    let filteredItems = prevData.filter((e) => {
      return e.name !== item.name;
    })
    saveData(filteredItems);
    this.setPause();
    this.getData();
    this.setPause();
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.navigationEvent.remove();
  }

  navigationEvent = this.props.navigation.addListener('willFocus', () => {
    this.getData();
  });

  render() {
    return (
      <View style={styles.homeContainer}>
        <ClockScreen />
        {this.state.isLoading ? (
          <LogListScreen
            data={this.state.DATA}
            validateRemoveItem={this.validateRemoveItem}
          />
        ) : (
          <ActivityIndicator />
        )}
        <CopyrightScreen />
      </View>
    );
  }
}


export default VistorLog;
