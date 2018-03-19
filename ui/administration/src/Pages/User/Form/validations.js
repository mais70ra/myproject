import {
    required,
    integer,
    length,
    email,
    matchesField
} from '../../../Common/validations';
import { Translate } from '../../../Setup/Translate';

const validations = {
    firstName: [
        required,
        length(2, 25, Translate('First name should be between 2 and 25 symbols long')),
    ],
    middleName: [
        required,
        length(2, 25, Translate('Middle name should be between 2 and 25 symbols long')),
    ],
    lastName: [
        required,
        length(2, 25, Translate('Last name should be between 2 and 25 symbols long')),
    ],
    phone: [
        required,
        integer,
        length(3, 20, Translate('Phone number should be between 3 and 20 numbers long')),
    ],
    email: [
        required,
        email,
        length(6, 50, Translate('Email should be between 6 and 50 symbols long')),
    ],
    username: [
        required,
        length(2, 25, Translate('Username name should be between 2 and 25 symbols long')),
    ],
    password: [
        required,
        length(2, 25, Translate('Password name should be between 2 and 25 symbols long')),
    ],
    repassword: [
        matchesField('password', Translate('The password does not match'))
    ]
};

export default validations;
