const validateFields = (values, arr) => {
  let errors = [];

  if (!values.inputName) {
   errors.inputName = "Full Name required"; 
  }else {
    if (isDuplicateArray(arr, values.inputName)){
      errors.inputName = `${values.inputName} already logged`;
    }
  }

  if (!values.inputPerson) {
    errors.inputPerson = "Person to Visit required";
  }

  if (!values.inputPurpose) {
    errors.inputPurpose = "Purpose required";
  }
  
  if (!values.inputIDNo) {
    errors.inputIDNo = "ID No. Required";
  }

  return errors;
};

export default validateFields;

const isDuplicateArray = (arr, value) => {
  let isDuplicate = false;
  arr.forEach(arrItem => {
    if (arrItem.inputName === value) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
};