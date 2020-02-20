import React, {useRef} from 'react';

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
    handleSubmit,
    errors,
    handleBlur,
    inputRefName,
    inputRefID,
    inputRefPerson,
    inputRefPurpose,
    inputRefIDNo,
    inputRefHost,
  } = formValidation(
    props.state.curDate,
    props.data,
    validateFields,
    updateData,
  );
  
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
        onSubmitEditing={() => inputRefID.current.focus()}
        ref={inputRefName}
      />
      {errors.inputName && (
        <Text style={styles.errText}>{errors.inputName}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Identification Presented"
        name="inputID"
        blurOnSubmit={false}
        onChangeText={inputID => handleChange(inputID, 'inputID')}
        onSubmitEditing={() => inputRefPerson.current.focus()}
        ref={inputRefID}
      />
      {/* {errors.inputID && <Text styele={styles.errText}>{errors.inputID}</Text>} */}
      <TextInput
        style={styles.textInput}
        placeholder="Person to Visit"
        name="inputPerson"
        blurOnSubmit={false}
        onChangeText={person => handleChange(person, 'inputPerson')}
        onBlur={handleBlur}
        onSubmitEditing={() => inputRefPurpose.current.focus()}
        ref={inputRefPerson}
      />
      {errors.inputPerson && (
        <Text style={styles.errText}>{errors.inputPerson}</Text>
      )}
      <TextInput
        style={styles.detailInput}
        multiline={true}
        numberOfLines={5}
        maxLength={1000}
        placeholder="Purpose"
        name="inputPurpose"
        blurOnSubmit={false}
        onChangeText={purpose => handleChange(purpose, 'inputPurpose')}
        onBlur={handleBlur}
        onSubmitEditing={() => inputRefIDNo.current.focus()}
        ref={inputRefPurpose}
      />
      {errors.inputPurpose && (
        <Text style={styles.errText}>{errors.inputPurpose}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="ID No."
        name="inputIDNo"
        blurOnSubmit={false}
        onChangeText={IDNo => handleChange(IDNo, 'inputIDNo')}
        onBlur={handleBlur}
        onSubmitEditing={() => inputRefHost.current.focus()}
        ref={inputRefIDNo}
      />
      {errors.inputIDNo && (
        <Text style={styles.errText}>{errors.inputIDNo}</Text>
      )}
      <TextInput
        style={styles.textInput}
        placeholder="Host Name"
        name="inputHost"
        blurOnSubmit={false}
        onChangeText={host => handleChange(host, 'inputHost')}
        onSubmitEditing={() => Keyboard.dismiss()}
        ref={inputRefHost}
      />
      <TouchableOpacity style={styles.touchable} onPress={handleSubmit}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Form;
