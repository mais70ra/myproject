var errorCodes = require('./errorCodes');
module.exports = {
    throw: (code, meta) => {
        let err;
        if (typeof code === 'string') {
            err = new Error((errorCodes[code] && errorCodes[code].message) || code);
            err.code = (errorCodes[code] && errorCodes[code].code) || 'undefined';
            if (errorCodes[code] && errorCodes[code].stack) {
                err.stack = errorCodes.undefined.stack;
            }
        } else if(code instanceof Error && code.code !== 'undefined') {
            code.message = (errorCodes[code.code] && errorCodes[code.code].message) || code.message;
            code.code = (errorCodes[code.code] && errorCodes[code.code].code) || 'undefined';
        } else {
            err = new Error(errorCodes.undefined.message);
            err.code = errorCodes.undefined.code;
        }
        return Promise.reject(err || code);
    },
    add: (err) => {
        errorCodes[err.code] = err;
        return Promise.resolve(true);
    }
};
