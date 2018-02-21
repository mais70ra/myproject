'use strict';
module.exports = {
    ports: {
        http: require('./http'),
        db: require('./db')([
            require('../modules/user/definition'),
            require('../modules/role/definition'),
        ])
    },
    modules: {
        identity: require('../modules/identity'),
        user: require('../modules/user'),
        role: require('../modules/role')
    }
};
