'use strict';
var bus;
const config = require('./config');
module.exports = {
    init: (b) => {
        bus = b;
    },
    get: (msg, context) => {
        let lang = (context.session && context.session.lang || bus.config.languages.defaultLang);
        let inMemoryDictionaries = require('../../translations/locales/' + lang + '/dictionaries');;
        if (!msg.dictionaries) {
            msg.dictionaries = Object.keys(inMemoryDictionaries); // Add the dictionaries from DB
        } else if (msg.dictionaries && !Array.isArray(msg.dictionaries)) {
            msg.dictionaries = Object.keys(inMemoryDictionaries); // Add the dictionaries from DB
        }
        let promises = [];
        let response = {};
        
        msg.dictionaries.forEach(dict => {
            if (config.dictionariesDB[dict] && config.dictionariesDB[dict].type === 'db') {
                // TODO
            } else {
                response[dict] = inMemoryDictionaries[dict];
            }
        });
        return Promise.all(promises)
        .then(() => {
            return response;
        })
    }
};
