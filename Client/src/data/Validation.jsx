function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email, please make sure you include @ and .';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(values.password)) {
    errors.password = 'Password must be at least 8 characters long and include at least one number and one special character';
  }
  return errors;
};

export {
validate}