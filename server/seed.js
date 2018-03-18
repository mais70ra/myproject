'use strict';
module.exports = {
    ports: {
        db: require('../db')
    },
    modules: {
        user: require('../modules/user'),
        product: require('../modules/product'),
        role: require('../modules/role')
    }
};
