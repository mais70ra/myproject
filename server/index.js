'use strict';
module.exports = {
    ports: {
        httpserver: require('../httpserver'),
        db: require('../db')
    },
    modules: {
        user: require('../impl/user'),
        product: require('../impl/product'),
        role: require('../impl/role')
    }
};
