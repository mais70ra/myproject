'use strict';
var Sequelize = require('sequelize');
Sequelize.Validator.notNull = function (item) {
    return !this.isNull(item);
};
const Op = Sequelize.Op;
var CryptoJS = require("crypto-js");

function Db (bus) {
    this.bus = bus;
    this.sequelize = undefined;
    this.db = {};
    this.objects = {};
}

Db.prototype.init = function(m) {
    var maps = m.slice(0);
    this.bus.config;
    this.sequelize = new Sequelize(
        this.bus.config.credentinals.database,
        this.bus.config.credentinals.username,
        this.bus.config.credentinals.password,
        this.bus.config.props
    );
    maps.forEach(function(map) {
        let define = {};
        this.objects[map.name] = {};
        map.fields.forEach(function(field) {
            if (field.define.typeParams) {
                field.define.type = Sequelize[field.define.type].apply(Sequelize[field.define.type], field.define.typeParams);
            } else {
                field.define.type = Sequelize[field.define.type];
            }
            if (field.gdpr) {
                this.objects[map.name].gdpr = this.objects[map.name].gdpr || [];
                this.objects[map.name].gdpr.push(field.name);
            }
            define[field.name] = field.define;
        }.bind(this));
        this.db[map.name] = this.sequelize.define(map.name, define, map.extend);
    }.bind(this));
    return this.sequelize.sync()
    .then(function() {
        return Promise.resolve(true);
    });
}

Db.prototype.send = (...obj) => {
    // obj, operation, msg
    let msg = Array.prototype.slice.call(obj, 2);
    let gdprKey = this.bus.config.gdprKey;
    if (this.objects[obj[0]].gdpr) {
        this.objects[obj[0]].gdpr.forEach(field => {
            if (obj[2] && obj[2][field]) {
                obj[2][field] = CryptoJS.AES.encrypt(obj[2][field], gdprKey);
                obj[2][field] = obj[2][field].toString();
            }
        });
    }
    return this.db[obj[0]][obj[1]].apply(this.db[obj[0]], msg)
    .then(resp => {
        if (this.objects[obj[0]].gdpr) {
            if (Array.isArray(resp) && resp.length > 0) {
                resp.forEach((row) => {
                    this.objects[obj[0]].gdpr.forEach(field => {
                        if (row[field]) {
                            row[field] = CryptoJS.AES.decrypt(row[field].toString(), gdprKey);
                            row[field] = row[field].toString(CryptoJS.enc.Utf8);
                        }
                    });
                }).bind(this);
            } else {
                this.objects[obj[0]].gdpr.forEach(field => {
                    if (resp[field]) {
                        resp[field] = CryptoJS.AES.decrypt(resp[field].toString(), gdprKey);
                        resp[field] = resp[field].toString(CryptoJS.enc.Utf8);
                    }
                });
            }
        }
        return resp;
    }).bind(this);
}


module.exports = Db;
