import React, { useState, createRef } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';

import styles from '.././styles/styles';
import formValidation from '.././validation/formValidation';
import validateFields from '.././validation/validateValues';
import {updateData} from '../storage/database';

const Form = props => {
  const {
    handleChange,
    values,
    logData,
    errors,
    handleBlur,
    nextFocus,
    createRef,
  } = formValidation(props.data, validateFields, updateData);
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        name="inputName"
        autoCapitalize="characters"
        onChangeText={Name => handleChange(Name, 'inputName')}
        onBlur={handleBlur}
        blurOnSubmit={false}
        // onSubmitEditing={nextFocus}
        // onSubmitEditing={() => this.inputID.focus()}
      />
      {errors.inputName && <Text style={styles.errText}>{errors.inputName}</Text>}
      <TextInput
        style={styles.textInput}
        placeholder="Identification Presented"
        blurOnSubmit={false}
        onChangeText={inputID => handleChange(inputID, 'inputID')}
        // ref={input => createRef(input)}
        // onSubmitEditing={() => this.inputPerson.focus()}
      />
      {/* {errors.inputID && <Text styele={styles.errText}>{errors.inputID}</Text>} */}
      <TextInput
        style={styles.textInput}
        placeholder="Person to Visit"
        blurOnSubmit={false}
        onChangeText={person => handleChange(person, 'inputPerson')}
        // ref={input => this.inputPerson = input}
        // onSubmitEditing={() => this.inputPurpose.focus()}
        onBlur={handleBlur}
      />
      {errors.inputPerson && <Text style={styles.errText}>{errors.inputPerson}</Text>}
      <TextInput
        style={styles.detailInput}
        multiline={true}
        numberOfLines={5}
        maxLength={1000}
        placeholder="Purpose"
        blurOnSubmit={false}
        onChangeText={purpose => handleChange(purpose, 'inputPurpose')}
        // ref={input => this.inputPurpose = input}
        onBlur={handleBlur}
      />
      {errors.inputPurpose && <Text style={styles.errText}>{errors.inputPurpose}</Text>}
      <TextInput
        style={styles.textInput}
        placeholder="ID No."
        blurOnSubmit={false}
        onChangeText={IDNo => handleChange(IDNo, 'inputIDNo')}
        // ref={input => this.inputIDNo = input}
        // onSubmitEditing={() => this.inputHost.focus()}
        onBlur={handleBlur}
      />
      {errors.inputIDNo && <Text style={styles.errText}>{errors.inputIDNo}</Text>}
      <TextInput
        style={styles.textInput}
        placeholder="Host Name"
        blurOnSubmit={false}
        onChangeText={host => handleChange(host, 'inputHost Name')}
        // ref={input => this.inputHost = input}
      />
      <TouchableOpacity style={styles.touchable} onPress={logData}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
    
  );
};

export default Form;