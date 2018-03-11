import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmpty from 'validator/lib/isEmpty';
import isInt from 'validator/lib/isInt';

const stringify = value => (value || value === 0 ? String(value) : '');

export const required = value => {
  const stringified = stringify(value);
  return !isEmpty(stringified) && /\S/.test(stringified)
    ? undefined
    : 'Field is required';
};

export const number = value => {
  const stringified = stringify(value);
  return isNumeric(stringified) ? undefined : 'Only numbers allowed';
};

export const integer = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isInt(stringified) ? undefined : 'Only integers allowed';
};

export const alphanumeric = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isAlphanumeric(stringified)
    ? undefined
    : 'Only alphanumeric characters allowed';
};

export const email = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isEmail(stringified) ? undefined : 'Email is invalid';
};

export const matchesField = (field, message) => (value, fields) =>
  value === fields[field] ? undefined : message;
