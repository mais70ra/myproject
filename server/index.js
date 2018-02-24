'use strict';
module.exports = {
    ports: {
        http: require('./http'),
        db: require('./db')([
            require('../impl/user/definition'),
            require('../impl/role/definition'),
            require('../impl/product/definition'),
        ])
    },
    modules: {
        user: require('../impl/user'),
        product: require('../impl/product'),
        role: require('../impl/role')
    }
};
