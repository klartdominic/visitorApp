import React, {Component} from 'react';
import {
  View,
  Alert,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import FormScreen from '.././components/form';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';

import {fetchData, updateData} from '../storage/database';

class Home extends Component {
  constructor(props) {
    super(props);
    // this.navigationEvent = this.navigationEvent.bind(this);
    // navigationEvent = navigationEvent.bind(this);

    this.state = {
      curDate: '',
      fullDate: '',
      DATA: [],
    };
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

  componentDidMount() {
    let today = new Date();
    this.state.fullDate = today.toLocaleString();
    this.state.curDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    this.getData();
  }

  componentWillUnmount() {
    this.navigationEvent.remove();
  }

  navigationEvent = this.props.navigation.addListener('willFocus', () => {
    this.getData();
  });

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  
  logData = () => {
    let states = this.state;
    let setObject = {
      date: states.fullDate,
      name: states.inputName.text,
      id: states.inputID.text,
      person: states.inputPerson.text,
      purpose: states.inputPurpose.text,
      idNo: states.inputIDNo.text,
      host: states.inputHost.text,
      createdAt: states.curDate,
    };
    // AsyncStorage.clear();

    if (this.isValidateAll()) {
      updateData(setObject).then(DATA => {
        this.setState({DATA});
        Alert.alert('Welcome', 'Successful');
        try {
          this.props.navigation.navigate('Visitor');
        } catch (error) {
          console.log('logData ', error)
        }
        Keyboard.dismiss();
      });
    } else {
      this.checkValidation('Name', 'Full Name') ;
      this.checkValidation('Person', 'Person to Visit');
      this.checkValidation('Purpose', 'Purpose');
      this.checkValidation('IDNo', 'ID No.');
      Alert.alert('Invalid', 'Please check highlighted fields');
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView
        innerRef={ref => {
          this.scroll = ref
        }}
        extraHeight= {1}
        extraScrollHeight={1}
        automaticallyAdjustContentInsets={false}>
        <View style={styles.homeContainer}>
          <LogoScreen />
          <ClockScreen />
          <FormScreen 
            state={this.state}
            data={[...this.state.DATA]}
            validateInput={this.validateInput}
            checkValidation={this.checkValidation}
            checkName={this.checkName}
            logData={this.logData}
            errName={this.state.errName}
            errID={this.state.errID}
            errPerson={this.state.errPerson}
            errPurpose={this.state.errPurpose}
            errIDNo={this.state.errIDNo}
            errHost={this.state.errHost}
            inputID={this.inputID}
          />
          <CopyrightScreen />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Home;

