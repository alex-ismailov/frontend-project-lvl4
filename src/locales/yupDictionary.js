export default {
  mixed: {
    notOneOf: 'mustBeUnique',
    oneOf: 'passwordsMustMatch',
    required: 'required',
  },
  // Почему это не работает?
  // string: {
  //   required: 'required',
  // }
  string: {
    min: 'minChars',
    max: 'maxChars',
  },
};
