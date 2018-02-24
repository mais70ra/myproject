module.exports = {
    validateRpcRequest: function(body) {
        if (!body.method) {
            return Promise.reject('method_missing');
        }
        if (!body.id) {
            return Promise.reject('id_missing');
        }
        if (!body.jsonrpc) {
            return Promise.reject('jsonrpc_missing');
        }
        if (!body.params) {
            return Promise.reject('params_missing');
        }
        return Promise.resolve(true);
    },
    validateHeadersRequest: function(headers) {
        if (!headers['content-type']) {
            return Promise.reject('header_content_type_missing');
        }
        if (headers['content-type'] !== 'application/json; charset=utf-8') {
            return Promise.reject('header_content_type_is_not_json');
        }
        return Promise.resolve(true);
    }
};
