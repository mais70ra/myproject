var when = require('when');
module.exports = {
    validateRpcRequest: function(body) {
        if (!body.method) {
            return when.reject('Proparty method is missing');
        }
        if (!body.id) {
            return when.reject('Proparty id  is missing');
        }
        if (!body.jsonrpc) {
            return when.reject('Proparty jsonrpc  is missing');
        }
        if (!body.params) {
            return when.reject('Proparty params  is missing');
        }
        return when.resolve(true);
    },
    processPost: function(request, responseonse, callback) {
        let queryData = '';
        if (typeof callback !== 'function') return null;
        if (request.method === 'POST') {
            request.on('data', function(data) {
                queryData += data;
                if (queryData.length > 1e6) {
                    queryData = '';
                    responseonse.writeHead(413, {'Content-Type': 'text/plain'}).end();
                    request.connection.destroy();
                }
            });
            request.on('end', function() {
                request.body = queryData;
                callback();
            });
        } else {
            responseonse.writeHead(405, {'Content-Type': 'text/plain'});
            responseonse.end();
        }
    },
    routeHandler: function(req, response) {

    }
};
