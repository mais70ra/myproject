import isEmail from 'validator/lib/isEmail';
import isNumeric from 'validator/lib/isNumeric';
import isAlphanumeric from 'validator/lib/isAlphanumeric';
import isEmpty from 'validator/lib/isEmpty';
import isInt from 'validator/lib/isInt';
// import { I18n } from 'react-i18next';
let t = v => {
  return v;
}

const stringify = value => (value || value === 0 ? String(value) : '');

export const required = value => {
  const stringified = stringify(value);
  return !isEmpty(stringified) && /\S/.test(stringified)
    ? undefined
    : t('Field is required');
};

export const number = value => {
  const stringified = stringify(value);
  return isNumeric(stringified) ? undefined : t('Only numbers allowed');
};

export const integer = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isInt(stringified) ? undefined : t('Only integers allowed');
};

export const alphanumeric = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isAlphanumeric(stringified)
    ? undefined
    : t('Only alphanumeric characters allowed');
};

export const email = value => {
  const stringified = stringify(value);
  return isEmpty(stringified) || isEmail(stringified) ? undefined : t('Email is invalid');
};

export const matchesField = (field, message) => (value, fields) =>
  value === fields[field] ? undefined : message;

export const length = (minLength, maxLength, errorMessage) => value => {
  if (!value) return undefined;
  if (minLength && !maxLength && value.length >= minLength) {
    return undefined;
  } else if (maxLength && !minLength && value.length <= maxLength) {
    return undefined;
  } else if (
    maxLength &&
    minLength &&
    value.length >= minLength &&
    value.length <= maxLength
  ) {
    return undefined;
  }

  return t(errorMessage || 'Length is not valid.');
};
