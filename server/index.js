'use strict';
module.exports = {
    ports: {
        httpserver: require('../httpserver'),
        db: require('../db')
    },
    modules: {
        user: require('../modules/user'),
        product: require('../modules/product'),
        role: require('../modules/role')
    }
};
