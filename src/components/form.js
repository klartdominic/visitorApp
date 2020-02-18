import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';

import styles from '.././styles/styles';
import {
  fetchData,
  mergeData,
  saveData,
  updateData,
} from '../storage/database';
import { getData } from './logList';
import AsyncStorage from '@react-native-community/async-storage';
import VisitorLogScreen from '../screen/visitorLog';

class Form extends Component{
  constructor(){
    super()
    this.isValidateAll = this.isValidateAll.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.logData = this.logData.bind(this);

    this.state={
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
      errID:'',
      errPerson:'',
      errPurpose:'',
      errIDNo:'',
      errHost:'',
      isError: true,
      curDate: '',
      fullDate: '',
      DATA: [],
    };
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

  componentDidMount(){
    let today = new Date();
    this.state.fullDate = today.toLocaleString();
    this.state.curDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;

    this.getData();
  }

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  validateInput(text,fieldName){
    let _field = `input${fieldName}`;
    let setObject = {
      text: text,
      valid: text.length !== 0,
    };
    this.setState({ [_field]: setObject});
  }

  checkValidation = (fieldName, text) => {
    let _object = `input${fieldName}`;
    let _errObj = `err${fieldName}`;
    let _errText = `* ${text} is required`;
    let _isValid = this.state[_object].valid;

    _isValid
      ? this.setState({[_errObj]: null})
      : this.setState({[_errObj]: _errText});
  };

  checkName = async (value) => {
    let _object = 'inputName';
    let _errObj = 'errName';
    let _isValid = this.state[_object].valid;
    let prevData = [...this.state.DATA];

    if (_isValid) {
      prevData.every(arrItem => {
        if (arrItem.name === value) {
          this.setState({
            [_errObj]: `* ${value} is already logged`,
            [_object]: {text: value, valid: false},
          });
          console.log('is already logged',this.state.inputName)
          return false;
        } else {
          this.setState({
            [_errObj]: null,
            [_object]: {text: value, valid: true},
          });
          console.log('not logged', this.state.inputName)
        }
      });
    } else {
      this.setState({[_errObj]: `* Full Name is required`});
      console.log('fullname is required',this.state.inputName)
    }
      
      
  }

  isValidateAll = () => {
    if (
      this.state.inputName.valid === true &&
      this.state.inputPerson.valid === true &&
      this.state.inputPurpose.valid === true &&
      this.state.inputIDNo.valid === true
    ){
      return true;
    } else {
      return false;
    }
  };

  logData = (that) => {
    let states = that.state
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
        this.props.navigator.navigate('Visitor');
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
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.textInput}
          placeholder="Name" 
          onSubmitEditing={() => this.inputID.focus()}
          onChangeText={(Name) => this.validateInput(Name, 'Name')}
          onBlur={() =>
            this.checkName(this.state.inputName.text)
          }
        />
        <Text style={styles.errText}>{this.state.errName}</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Identification Presented"
          onChangeText={(inputID) => this.validateInput(inputID, 'ID')}
          ref={(input) => this.inputID = input}
          onSubmitEditing={() => this.inputPerson.focus()}
        />
        <Text style={styles.errText}>{this.state.errID}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Person to Visit"
          onChangeText={(Person) => this.validateInput(Person, 'Person')}
          ref={(input) => this.inputPerson = input}
          onSubmitEditing={() => this.inputPurpose.focus()}
          onBlur={() => this.checkValidation('Person', 'Person to Visit')}
        />
        <Text style={styles.errText}>{this.state.errPerson}</Text>
        <TextInput
          style={styles.detailInput}
          multiline={true}
          numberOfLines={5}
          maxLength={1000}
          placeholder="Purpose"
          onChangeText={(Purpose) => this.validateInput(Purpose, 'Purpose')}
          ref={(input) => this.inputPurpose = input}
          onSubmitEditing={() => this.inputIDNo.focus()}
          onBlur={() => this.checkValidation('Purpose', 'Purpose')}
        />
        <Text style={styles.errText}>{this.state.errPurpose}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="ID No." 
          onChangeText={(IDNo) => this.validateInput(IDNo, 'IDNo')}
          ref={(input) => this.inputIDNo = input}
          onSubmitEditing={() => this.inputHost.focus()}
          onBlur={() => this.checkValidation('IDNo', 'ID No.')}
        />
        <Text style={styles.errText}>{this.state.errIDNo}</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Host Name"
          onChangeText={(Host) => this.validateInput(Host, 'Host Name')}
          ref={(input) => this.inputHost = input}
        />
        <Text style={styles.errText}>{this.state.errHost}</Text>
        
        <TouchableOpacity 
          style={styles.touchable}
          onPress={() => this.logData(this)}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Form;