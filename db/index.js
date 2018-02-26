'use strict';
module.exports = {
    type: 'db',
    definitions: [
        require('../impl/user/definition'),
        require('../impl/role/definition'),
        require('../impl/product/definition'),
    ],
    init: (b) => {
        
    }
};
