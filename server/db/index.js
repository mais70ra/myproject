'use strict';
var Sequelize = require('sequelize');
var sequelize;
var db = {};
var bus;
var maps;
module.exports = (m) => {
    maps = m;
    return {
        init: (b) => {
            bus = b;
            sequelize = new Sequelize(
                bus.config.credentinals.database,
                bus.config.credentinals.username,
                bus.config.credentinals.password,
                bus.config.props
            );
            maps.forEach((map) => {
                let define = {};
                map.fields.forEach(field => {
                    define[field.name] = Sequelize[field.type];
                });
                db[map.name] = sequelize.define(map.name, define);
            });
            sequelize.sync();
        },
        query: (obj, operation, msg) => {
            return db[obj][operation](msg);
        }
    };
};
