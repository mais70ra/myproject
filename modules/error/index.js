var errorCodes = require('./errorCodes');
module.exports = {
    throw: (code, meta) => {
        let err = new Error();
        if (typeof code === 'string') {
            err.message = (errorCodes[code] && errorCodes[code].message) || code;
            err.code = (errorCodes[code] && errorCodes[code].code) || 'undefined';
            if (errorCodes[code] && errorCodes[code].stack) {
                err.stack = errorCodes[code].stack;
            }
        } else if(code instanceof Error && code.code !== 'undefined') {
            err.code = (errorCodes[code.message] && errorCodes[code.message].code) || 'undefined';
            err.message = err.code === 'undefined' ? code.message : errorCodes[err.code].message;
            err.stack = err.code === 'undefined' ? code.stack : (errorCodes[err.code].stack || code.stack);
        } else {
            err.message = errorCodes.undefined.message;
            err.code = errorCodes.undefined.code;
        }
        return Promise.reject(err || code);
    },
    add: (err) => {
        errorCodes[err.code] = err;
        return Promise.resolve(true);
    }
};
