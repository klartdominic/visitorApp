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

const FormCopy = (props) => {
  // console.log('FormCopy', this)
  return (
    <View style={styles.formContainer}>
      <TextInput 
        style={styles.textInput}
        placeholder="Name" 
        onSubmitEditing={() => this.inputID.focus()}
        onChangeText={(Name) => props.validateInput(Name, 'Name')}
        onBlur={() => props.checkName()}
      />
      <Text style={styles.errText}>{props.errName}</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Identification Presented"
        onChangeText={(inputID) => props.validateInput(inputID, 'ID')}
        ref={(input) => this.inputID = input}
        onSubmitEditing={() => this.inputPerson.focus()}
      />
      <Text style={styles.errText}>{props.errID}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Person to Visit"
        onChangeText={(Person) => props.validateInput(Person, 'Person')}
        ref={(input) => this.inputPerson = input}
        onSubmitEditing={() => this.inputPurpose.focus()}
        onBlur={() => props.checkValidation('Person', 'Person to Visit')}
      />
      <Text style={styles.errText}>{props.errPerson}</Text>
      <TextInput
        style={styles.detailInput}
        multiline={true}
        numberOfLines={5}
        maxLength={1000}
        placeholder="Purpose"
        onChangeText={(Purpose) => props.validateInput(Purpose, 'Purpose')}
        ref={(input) => this.inputPurpose = input}
        onSubmitEditing={() => this.inputIDNo.focus()}
        onBlur={() => props.checkValidation('Purpose', 'Purpose')}
      />
      <Text style={styles.errText}>{props.errPurpose}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="ID No." 
        onChangeText={(IDNo) => props.validateInput(IDNo, 'IDNo')}
        ref={(input) => this.inputIDNo = input}
        onSubmitEditing={() => this.inputHost.focus()}
        onBlur={() => props.checkValidation('IDNo', 'ID No.')}
      />
      <Text style={styles.errText}>{props.errIDNo}</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Host Name"
        onChangeText={(Host) => props.validateInput(Host, 'Host Name')}
        ref={(input) => this.inputHost = input}
      />
      <Text style={styles.errText}>{props.errHost}</Text>
      
      <TouchableOpacity 
        style={styles.touchable}
        onPress={() => props.logData()}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


export default FormCopy;