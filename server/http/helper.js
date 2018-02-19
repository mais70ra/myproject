module.exports = {
    validateRpcRequest: function(body) {
        if (!body.method) {
            return new Promise.reject('Proparty method is missing');
        }
        if (!body.id) {
            return new Promise.reject('Proparty id  is missing');
        }
        if (!body.jsonrpc) {
            return new Promise.reject('Proparty jsonrpc  is missing');
        }
        if (!body.params) {
            return new Promise.reject('Proparty params  is missing');
        }
        return new Promise.resolve(true);
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
