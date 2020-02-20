import React, {Component} from 'react';
import {ActivityIndicator, View, Alert, Keyboard} from 'react-native';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';
import LogListScreen from '.././components/logList';
import {fetchData, saveData} from '../storage/database';

class VisitorLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DATA: [],
      isLoading: true,
      externalData: null,
    };
    this._isMounted = false;
  }

  getData = async () => {
    await fetchData().then(DATA => this.setState({DATA}));
    this.setPause();
    console.log(this.state.DATA);
  };

  setPause = () => {
    setInterval(() => {
      this.setState({
        isLoading: true,
      });
    }, 3000);
    this.setState({isLoading: false});
  };

  validateLogOut = item => {
    Alert.alert(
      'Logout',
      `Confirm to Logout ${item.inputName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.logoutVisitor(item);
          },
        },
      ],
      {cancelable: true},
    );
  };

  logoutVisitor = item => {
    let time = new Date().toLocaleTimeString();
    let prevData = [...this.state.DATA];
    prevData.forEach(prevItem => {
      if (prevItem.inputName === item.inputName) {
        prevItem.timeOut = time;
      }
    });
    console.log('filteredItems', prevData);
    saveData(prevData);
    this.setPause();
    this.getData();
    this.setPause();
  };

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.getData();
  }

  componentWillUnmount() {
    this.navigationEvent.remove();
    this._isMounted = false;
  }

  navigationEvent = this.props.navigation.addListener('willFocus', () => {
    this.getData();
    Keyboard.dismiss();
  });

  render() {
    return (
      <View style={styles.homeContainer}>
        <ClockScreen />
        {this.state.isLoading ? (
          <LogListScreen
            data={this.state.DATA}
            validateLogOut={this.validateLogOut}
          />
        ) : (
          <ActivityIndicator />
        )}
        <CopyrightScreen />
      </View>
    );
  }
}

export default VisitorLog;
