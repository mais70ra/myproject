var err = require('../../modules/error');
module.exports = {
    validateRpcRequest: function(body) {
        if (!body.method) {
            return err.throw('method_missing');
        }
        if (!body.id) {
            return err.throw('id_missing');
        }
        if (!body.jsonrpc) {
            return err.throw('jsonrpc_missing');
        }
        if (!body.params) {
            return err.throw('params_missing');
        }
        return Promise.resolve(true);
    },
    validateHeadersRequest: function(headers) {
        if (!headers['content-type']) {
            return err.throw('header_content_type_missing');
        }
        if (headers['content-type'] !== 'application/json; charset=utf-8') {
            return err.throw('header_content_type_is_not_json');
        }
        return Promise.resolve(true);
    }
};
