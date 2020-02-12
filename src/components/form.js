import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from '.././styles/styles';
import {
  fetchData,
  mergeData,
  saveData
} from '../storage/database';
import AsyncStorage from '@react-native-community/async-storage';

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

  componentDidMount(){
    // for testing only
    this.setState({
      inputName: {text: 'testInputName', valid: true},
      inputID: {text: 'testinputID', valid: true},
      inputPerson: {text: 'testinputPerson', valid: true},
      inputPurpose: {text: 'testinputPurpose', valid: true},
      inputIDNo: {text: 'testinputIDNo', valid: true},
      inputHost: {text: 'tesinputHost', valid: true},
    });

    let today = new Date();
    this.state.fullDate = today.toLocaleString();
    this.state.curDate = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
  }

  async updateData(data){
    try {
      let DATA = await fetchData();
      DATA = mergeData(DATA, data);
      saveData(DATA);

      this.setState({DATA});
      console.log('Visitors', this.state.DATA);
    } catch (err) {
      console.log('Error fetching Data updateData', err);
    }
  }

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
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

  logData = (states) => {
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
    this.updateData(setObject);
    // AsyncStorage.clear();

    // if (this.isValidateAll()) {
      // mergeData(existingData, setObject);
    // } else {
    //   this.checkValidation('Name', 'Full Name') ;
    //   this.checkValidation('Person', 'Person to Visit');
    //   this.checkValidation('Purpose', 'Purpose');
    //   this.checkValidation('IDNo', 'ID No.');
    //   Alert.alert('Invalid', 'Please check highlighted fields');
    // }
  };

  render() {
    return (
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.textInput}
          placeholder="Name" 
          onSubmitEditing={() => this.inputID.focus()}
          onChangeText={(Name) => this.validateInput(Name, 'Name')}
          onBlur={() => this.checkValidation('Name', 'Full Name')}
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
          onPress={() => this.logData(this.state)}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Form;