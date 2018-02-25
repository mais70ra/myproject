module.exports = {
    name: 'user',
    fieldsList: [
        'username',
        'firstName',
        'middleName',
        'email',
        'loginAttempts',
        'status'
    ],
    fields: [{
        name: 'username',
        define: {
            type: 'STRING',
            typeParams: [25],
            unique: true,
            allowNull: false,
            validate: {
                len: [2, 25],
                notNull: {msg: 'Username is required.'}
            }
        }
    }, {
        name: 'password',
        define: {
            type: 'STRING',
            allowNull: false
        }
    }, {
        name: 'firstName',
        define: {
            type: 'STRING',
            typeParams: [25],
            allowNull: false,
            validate: {
                len: [2, 25],
                notNull: {msg: 'First name is required.'}
            }
        }
    }, {
        name: 'middleName',
        define: {
            type: 'STRING',
            allowNull: true,
            defaultValue: null
        }
    }, {
        name: 'lastName',
        define: {
            type: 'STRING',
            typeParams: [25],
            allowNull: false,
            validate: {
                len: [2, 25],
                notNull: {msg: 'Last name is required.'}
            }
        }
    }, {
        name: 'email',
        define: {
            type: 'STRING',
            typeParams: [40],
            unique: true,
            allowNull: true,
            validate: {
                len: [5, 40],
                isEmail: { msg: 'Invalid email.' }
            }
        }
    }, {
        name: 'phone',
        define: {
            type: 'STRING',
            typeParams: [20],
            allowNull: true,
            validate: {
                len: [3, 20]
            }
        }
    }, {
        name: 'loginAttempts',
        includeInList: false,
        define: {
            type: 'SMALLINT',
            typeParams: [2],
            defaultValue: 0,
            validate: {
                isNumeric: true
            }
        }
    }, {
        name: 'status',
        define: {
            type: 'STRING',
            typeParams: [10],
            defaultValue: 'active',
            validate: {
                len: [2, 10]
            }
        }
    }],
    extend: {
        defaultScope: {
            attributes: { exclude: ['password'] },
        }
    }
};
