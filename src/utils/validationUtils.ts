function validateEmail(str: string) {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(str);
}

// min 8 letter password, with at least a symbol, upper and lower case letters and a number
function validatePassword(str: string) {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(str);
}

export { validateEmail, validatePassword };
