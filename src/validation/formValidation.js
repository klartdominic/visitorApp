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
};

const formValidation = (curDate, data, validate, updateData) => {
  const [values, setValues] = React.useState(INITIAL_DATAFIELDS);
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
      id: `${curDate}-${data.length}`,
      [field]: value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values, data);
    setErrors(validationErrors);
  };

  const handleSubmit = () => {
    const validationErrors = validate(values, data);
    setErrors(validationErrors);

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
