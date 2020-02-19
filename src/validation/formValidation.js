import React, {useState, useEffect} from 'react';
import { useNavigation } from 'react-navigation-hooks'



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
  const { navigate } = useNavigation();

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      console.log('count array', data.length)
      if (noErrors) {
        console.log(isSubmitting);
        updateData(values).then(data => {
          navigate('Visitor');
        });
      }
      setSubmitting(false);
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
    const validationErrors = validate(values, data);
    setErrors(validationErrors);

    setSubmitting(true);
    // const noErrors = Object.keys(errors).length === 0;
    // if (noErrors){
    //   updateData(values).then(data => {
    //     navigate('Visitor');
    //     setSubmitting(true);
    //   }).catch(err => {console.log(err)})
        
    // }
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
