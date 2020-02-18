import React, { Component } from 'react';
import {
  View,
  Alert,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import FormScreen from '.././components/form copy';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';

import {
  fetchData,
  updateData,
} from '../storage/database';

class Home2 extends Component {

  constructor() {
    super();
    this.isValidateAll = this.isValidateAll.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.logData = this.logData.bind(this);
    this.navigationEvent = this.navigationEvent.bind(this);

    this.state = {
      inputName: {
        text: '',
        valid: false,
      },
      inputID: {
        text: '',
        valid: false,
      },
      inputPerson: {
        text: '',
        valid: false,
      },
      inputPurpose: {
        text: '',
        valid: false,
      },
      inputIDNo: {
        text: '',
        valid: false,
      },
      inputHost: {
        text: '',
        valid: false,
      },
      errName: '',
      errID: '',
      errPerson: '',
      errPurpose: '',
      errIDNo: '',
      errHost: '',
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

  componentDidMount(){
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

  validateInput(text, fieldName) {
    let _field = `input${fieldName}`;

    let setObject = {
      text: text,
      valid: text.length !== 0,
    };
    this.setState({ [_field]: setObject});
  }

  checkValidation = (fieldName, text) => {
    console.log('checkValidation', fieldName, text);
    let _object = `input${fieldName}`;
    let _errObj = `err${fieldName}`;
    let _errText = `* ${text} is required`;
    let _isValid = this.state[_object].valid;
    this.setState({[_errObj]: null});
    if (!_isValid) {
      this.setState({[_errObj]: _errText});
    }
  };

  isDuplicateArray = (arr, value) => {
    let isDuplicate = false;
    arr.forEach(arrItem => {
      if (arrItem.name === value) {
        isDuplicate = true;
      }
    })
    return isDuplicate;
  };

  checkName = async () => {
    let _object = 'inputName';
    let _errObj = 'errName';
    let _value = this.state[_object].text;
    let _isValid = this.state[_object].valid;
    let prevData = [...this.state.DATA];
    let setObject = {
      text: '',
      valid: false,
    };
    // this.setState({inputName: setObject})
    console.log(this.state.inputName)

    if (!this.isDuplicateArray(prevData, _value)) {
      console.log(_isValid)
      if (_isValid) {
        setObject = {
          text: _value,
          valid: true,
        };
        this.setState({
          [_errObj]: null,
          [_object]: setObject
        });
        console.log('isValid',setObject,this.state.inputName)
      } else {
        this.setState({
          [_errObj]: `* Full Name is required`,
          [_object]: setObject,
        });
        console.log('inValid',this.state.inputName)
      }
    } else {
      setObject = {
        text: _value,
        valid: false,
      }
      this.setState({
        [_errObj]: `* ${_value} is already logged`,
        [_object]: setObject,
      });
      console.log('duplicate',setObject,this.state.inputName)
    }
  };

  isValidateAll = () => {
    if (
      this.state.inputName.valid === true &&
      this.state.inputPerson.valid === true &&
      this.state.inputPurpose.valid === true &&
      this.state.inputIDNo.valid === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  logData = () => {
    let states = this.state
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
      updateData(setObject).then((DATA) => {
        this.setState({DATA});
        Alert.alert('Welcome', 'Successful');
        this.props.navigation.navigate('Visitor');
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
          />
          <CopyrightScreen />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Home2;

