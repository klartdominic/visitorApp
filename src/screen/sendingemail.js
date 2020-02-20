import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '.././styles/styles';
import SendingEmail from '.././linking/sendemail';
import {fetchData} from '../storage/database';

class SendEmail extends Component {
  constructor() {
    super();
    this.state = {
      DATA: [],
    };
    this._isMounted = false;
  }

  componentDidMount(){
    this._isMounted = true;
    this._isMounted && this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = async () => {
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

  render() {
    return (
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.touchable} onPress={() => SendingEmail(this.state.DATA)}>
          <Text>send email</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SendEmail;
