import React, {useState, useEffect} from 'react';

const INITIAL_DATAFIELDS = {
  // inputName: '',
  inputName: '',
  inputID: '',
  inputPerson: '',
  inputPurpose: '',
  inputIDNo: '',
  inputHost: '',
}

const formValidation = (data, validate, updateData) => {
  const [values, setValues] = React.useState(INITIAL_DATAFIELDS);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      console.log('isSubmitting', isSubmitting)
      // const noErrors = Object.keys(errors).length === 0;
      // if (noErrors) {
      //   console.log(isSubmitting);
      //   setSubmitting(false);
      // } else {
      //   setSubmitting(false);
      // }
    }
  }, [errors]);

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

  const logData = () => {
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors){
      updateData(values).then( data => {
        console.log(data);
        setSubmitting(true);
      })
    }
  };

  const createRef = (input) => {
    console.log('createRef', input);
  }

  const nextFocus = () => {
    console.log('nextFocus');
  }

  return {
    handleChange,
    values,
    logData,
    errors,
    handleBlur,
    nextFocus,
    createRef,
  };
};

export default formValidation;
