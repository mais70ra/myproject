'use strict';
module.exports = {
    type: 'db',
    definitions: [
        require('../modules/user/definition'),
        require('../modules/role/definition'),
        require('../modules/product/definition'),
    ],
    init: (b) => {
        
    }
};
