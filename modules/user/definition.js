module.exports = {
    name: 'user',
    fields: [{
        name: 'username',
        define: {
            type: 'STRING',
            typeParams: [25],
            unique: true,
            allowNull: false,
            validate: {
                len: [2, 25],
                notNull: {msg: 'Middle name should be between 2 and 25 symbols long.'}
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
                notNull: {msg: 'First name should be between 2 and 25 symbols long.'}
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
                len: [6, 50],
                isEmail: { msg: 'Email should be between 6 and 50 symbols long' }
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
    }, {
        name: 'lang',
        define: {
            type: 'STRING',
            typeParams: [2],
            allowNull: false,
            dict: 'languages',
            validate: {
                len: [2, 2]
            }
        }
    }, {
        name: 'gender',
        define: {
            type: 'STRING',
            typeParams: [1],
            allowNull: true,
            dict: 'gender',
            validate: {
                len: [1, 1]
            }
        }
    }],
    extend: {
        defaultScope: {
            attributes: { exclude: ['password'] },
        }
    }
};
