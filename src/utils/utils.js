// validate fields
export const validateFields = (fields, fieldsToValidate) => {
  const errors = [];
  fieldsToValidate.forEach(field => {
    if (!fields[field]) {
      errors.push(field);
    }
  });

  return errors;
};

// validate password
export const validatePassword = password => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return false;
  } else {
    return true;
  }
};

// validate email
export const validateEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
};
