'use strict';
var Sequelize = require('sequelize');
Sequelize.Validator.notNull = function (item) {
    return !this.isNull(item);
};
const Op = Sequelize.Op;
var CryptoJS = require("crypto-js");
var dictionaries;

function Db (bus) {
    this.bus = bus;
    this.sequelize = undefined;
    this.db = {};
    this.objects = {};
    dictionaries = require('../../../translations/locales/' + bus.config.languages.defaultLang + '/dictionaries');
}

Db.prototype.init = function(m) {
    var maps = m.slice(0);
    this.sequelize = new Sequelize(
        this.bus.config[this.bus.id].credentinals.database,
        this.bus.config[this.bus.id].credentinals.username,
        this.bus.config[this.bus.id].credentinals.password,
        this.bus.config[this.bus.id].props
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
            if (field.define.dict) {
                field.define.validate = field.define.validate || {};
                field.define.validate.is = allowOnlyDictValues(field.define.dict);
            }
            define[field.name] = field.define;
        }.bind(this));
        this.db[map.name] = this.sequelize.define(map.name, define, map.extend);
    }.bind(this));
    Db.self = this;
    return this.sequelize.sync()
    .then(function() {
        return Promise.resolve(true);
    });
}

function allowOnlyDictValues(d) {
    let dict = dictionaries[d];
    let keys = [];
    dict.forEach((option) => {
        keys.push(option.key);
    });
    return ['^' + keys.join('|') + '','i'];
}

Db.prototype.send = (...obj) => {
    // obj, operation, msg
    let msg = Array.prototype.slice.call(obj, 2);
    let gdprKey = Db.self.bus.config[Db.self.bus.id].gdprKey;
    if (Db.self.objects[obj[0]].gdpr) {
        Db.self.objects[obj[0]].gdpr.forEach(field => {
            if (obj[2] && obj[2][field]) {
                obj[2][field] = CryptoJS.AES.encrypt(obj[2][field], gdprKey);
                obj[2][field] = obj[2][field].toString();
            }
        });
    }
    return Db.self.db[obj[0]][obj[1]].apply(Db.self.db[obj[0]], msg)
    .then(resp => {
        if (Db.self.objects[obj[0]].gdpr) {
            if (Array.isArray(resp) && resp.length > 0) {
                resp.forEach((row) => {
                    Db.self.objects[obj[0]].gdpr.forEach(field => {
                        if (row[field]) {
                            row[field] = CryptoJS.AES.decrypt(row[field].toString(), gdprKey);
                            row[field] = row[field].toString(CryptoJS.enc.Utf8);
                        }
                    });
                });
            } else {
                Db.self.objects[obj[0]].gdpr.forEach(field => {
                    if (resp[field]) {
                        resp[field] = CryptoJS.AES.decrypt(resp[field].toString(), gdprKey);
                        resp[field] = resp[field].toString(CryptoJS.enc.Utf8);
                    }
                });
            }
        }
        return resp;
    });
}
module.exports = Db;
