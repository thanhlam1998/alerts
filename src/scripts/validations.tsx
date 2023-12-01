export const isValidEmail = () => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
};

export const REGEX_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

export const isValidPassword = () => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[0-9a-zA-Z@\!#\$\^%&*()+=\-[\]\\\‘;,\.\/\{\}\|\“:<>\? ]{8,}$/;
};

export const REGEX_PASSWORD =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[0-9a-zA-Z@\!#\$\^%&*()+=\-[\]\\\‘;,\.\/\{\}\|\“:<>\? ]{8,}$/;

export const validatePassword = (_rule: any, value: any, callback: any) => {
  if (!value) return callback("Please input new password");
  if (!REGEX_PASSWORD.test(value)) return callback("Password is invalid");
  else callback();
};

export const validateEmail = (_rule: any, value: any, callback: any) => {
  if (!value) return callback("Please enter your email");
  if (!REGEX_EMAIL.test(value)) callback("Your email is invalid");
  else callback();
};
