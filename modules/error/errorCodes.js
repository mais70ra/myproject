var codes = {
    'method_missing': {
        message: 'Proparty method is missing'
    },
    'id_missing': {
        message: 'Proparty id is missing'
    },
    'jsonrpc_missing': {
        message: 'Proparty jsonrpc is missing'
    },
    'params_missing': {
        message: 'Proparty params is missing'
    },
    'header_content_type_missing': {
        message: 'The header "content-type" is missing'
    },
    'header_content_type_is_not_json': {
        message: 'The header "content-type" is not application/json; charset=utf-8'
    },
    'undefined': {
        message: 'No error message'
    }
};
module.exports = {};
Object.keys(codes).forEach((v) => {
    module.exports[v] = codes[v];
    module.exports[v].code = v;
});
