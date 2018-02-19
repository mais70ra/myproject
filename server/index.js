module.exports = {
    ports: {
        http: require('../http'),
        // http2: require('../http2')
    },
    modules: {
        identity: require('../modules/identity'),
        user: require('../modules/user')
    }
};
