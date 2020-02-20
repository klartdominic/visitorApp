import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from 'react-navigation-hooks';
import {Alert} from 'react-native';

const INITIAL_DATAFIELDS = {
  id: '',
  inputName: '',
  inputID: '',
  inputPerson: '',
  inputPurpose: '',
  inputIDNo: '',
  inputHost: '',
  date: '',
  timeIn: '',
  timeOut: '',
};

const formValidation = (curDate, data, validate, updateData) => {
  const [values, setValues] = useState(INITIAL_DATAFIELDS);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const {navigate} = useNavigation();

  const inputRefName = useRef();
  const inputRefID = useRef();
  const inputRefPerson = useRef();
  const inputRefPurpose = useRef();
  const inputRefIDNo = useRef();
  const inputRefHost = useRef();

  useEffect(() => {
    if (isSubmitting) {
      console.log('Submitting', values);
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        updateData(values).then(data => {
          inputRefName.current.clear();
          inputRefID.current.clear();
          inputRefPerson.current.clear();
          inputRefPurpose.current.clear();
          inputRefIDNo.current.clear();
          inputRefHost.current.clear();
          Alert.alert(
            'Yokosu Sprobe eh',
            `Welcome to Sprobe ${values.inputName}`,
          );
          navigate('Visitor');
        });
      }
      setSubmitting(false);
    }
  }, [
    data.length,
    errors,
    isSubmitting,
    navigate,
    curDate,
    updateData,
    values,
  ]);

  const handleChange = (value, field) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values, data);
    setErrors(validationErrors);
  };

  const handleSubmit = () => {
    let today = new Date();

    const validationErrors = validate(values, data);
    setErrors(validationErrors);

    setValues({
      ...values,
      id: `${today.toLocaleDateString()}-${data.length}`,
      date: today.toLocaleDateString(),
      timeIn: today.toLocaleTimeString(),
    });

    setSubmitting(true);
  };

  return {
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
  };
};

export default formValidation;
