import {
    required,
    integer,
    length,
    email,
    matchesField
} from '../../../Common/validations';

const validations = {
    firstName: [
        required,
        length(2, 25, 'First name should be between 2 and 25 symbols long'),
    ],
    middleName: [
        required,
        length(2, 25, 'Middle name should be between 2 and 25 symbols long'),
    ],
    lastName: [
        required,
        length(2, 25, 'Last name should be between 2 and 25 symbols long'),
    ],
    phone: [
        required,
        integer,
        length(3, 20, 'Phone number should be between 3 and 20 numbers long'),
    ],
    email: [
        required,
        email,
        length(6, 50, 'Email should be between 6 and 50 symbols long'),
    ],
    username: [
        required,
        length(2, 25, 'Username name should be between 2 and 25 symbols long'),
    ],
    password: [
        required,
        length(2, 25, 'Password name should be between 2 and 25 symbols long'),
    ],
    repassword: [
        matchesField('password', 'The password does not match')
    ]
};

export default validations;
