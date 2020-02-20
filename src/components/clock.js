import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '.././styles/styles';

export default class Logo extends Component {
  constructor() {
    super();
    this.state = {
      curTime: '',
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      });
    }, 1000);
  }

  render() {
    let uri = '.././images/sprobe_logo.png';
    return (
      <View style={styles.clock}>
        <Text>{this.state.curTime}</Text>
      </View>
    );
  }
}
