import {
    required,
    integer,
    length,
    email,
    matchesField
} from '../../../Common/validations';
const t = v => {
    return v;
};
const validations = {
    firstName: [
        required,
        length(2, 25, t('First name should be between 2 and 25 symbols long')),
    ],
    middleName: [
        required,
        length(2, 25, t('Middle name should be between 2 and 25 symbols long')),
    ],
    lastName: [
        required,
        length(2, 25, t('Last name should be between 2 and 25 symbols long')),
    ],
    phone: [
        required,
        integer,
        length(3, 20, t('Phone number should be between 3 and 20 numbers long')),
    ],
    email: [
        required,
        email,
        length(6, 50, t('Email should be between 6 and 50 symbols long')),
    ],
    username: [
        required,
        length(2, 25, t('Username name should be between 2 and 25 symbols long')),
    ],
    password: [
        required,
        length(2, 25, t('Password name should be between 2 and 25 symbols long')),
    ],
    repassword: [
        matchesField('password', t('The password does not match'))
    ],
    lang: [
        required
    ],
    gender: [
        required
    ]
}

export default validations;
