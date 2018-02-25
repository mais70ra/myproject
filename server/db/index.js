'use strict';
var Sequelize = require('sequelize');
Sequelize.Validator.notNull = function (item) {
    return !this.isNull(item);
};
var CryptoJS = require("crypto-js");

var sequelize;
var db = {};
const Op = Sequelize.Op;
var bus;
var objects = {};
module.exports = (m) => {
    var maps = m;
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
                objects[map.name] = {};
                map.fields.forEach(field => {
                    if (field.define.typeParams) {
                        field.define.type = Sequelize[field.define.type].apply(Sequelize[field.define.type], field.define.typeParams);
                    } else {
                        field.define.type = Sequelize[field.define.type];
                    }
                    if (field.gdpr) {
                        objects[map.name].gdpr = objects[map.name].gdpr || [];
                        objects[map.name].gdpr.push(field.name);
                    }
                    define[field.name] = field.define;
                });
                db[map.name] = sequelize.define(map.name, define);
            });
            sequelize.sync();
        },
        send: (...obj) => {
            // obj, operation, msg
            let msg = Array.prototype.slice.call(obj, 2);
            if (objects[obj[0]].gdpr) {
                objects[obj[0]].gdpr.forEach(field => {
                    if (obj[2] && obj[2][field]) {
                        obj[2][field] = CryptoJS.AES.encrypt(obj[2][field], bus.config.gdprKey);
                        obj[2][field] = obj[2][field].toString();
                    }
                });
            }
            return db[obj[0]][obj[1]].apply(db[obj[0]], msg)
            .then(resp => {
                if (objects[obj[0]].gdpr) {
                    if (Array.isArray(resp) && resp.length > 0) {
                        resp.forEach((row) => {
                            objects[obj[0]].gdpr.forEach(field => {
                                if (row[field]) {
                                    row[field] = CryptoJS.AES.decrypt(row[field].toString(), bus.config.gdprKey);
                                    row[field] = row[field].toString(CryptoJS.enc.Utf8);
                                }
                            });
                        });
                    } else {
                        objects[obj[0]].gdpr.forEach(field => {
                            if (resp[field]) {
                                resp[field] = CryptoJS.AES.decrypt(resp[field].toString(), bus.config.gdprKey);
                                resp[field] = resp[field].toString(CryptoJS.enc.Utf8);
                            }
                        });
                    }
                }
                return resp;
            });
        }
    };
};
