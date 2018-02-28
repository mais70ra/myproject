var codes = {
    'method_missing': {
        message: 'Proparty method is missing'
    },
    'method_not_found': {
        message: 'Method not found'
    },
    'proparty_jwtKey_missing': {
        message: 'The proparty jwtKey is missing'
    },
    'you_are_not_logged_in': {
        message: 'You are not logged in. Please log in and try again'
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
    'invalid_credentials': {
        message: 'Invalid credentials'
    },
    'reached_login_attempts': {
        message: 'Your profile is locked because of too many login attempts.'
    },
    'user_locked': {
        message: 'Your profile is locked.'
    },
    'user_inactive': {
        message: 'Your profile is inactive.'
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
