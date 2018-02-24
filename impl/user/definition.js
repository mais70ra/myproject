module.exports = {
    name: 'user',
    fields: [{
        name: 'username',
        type: 'STRING',
    }, {
        name: 'password',
        type: 'STRING'
    }, {
        name: 'loginAttempts',
        type: 'INTEGER'
    }, {
        name: 'status',
        type: 'STRING'
    }]
};
