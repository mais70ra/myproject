const Hapi = require('hapi');
const helper = require('./helper');
const when = require('when');
module.exports = {
    start: function(bus, routes) {
        return when.promise((resolve, reject) => {
            const server = new Hapi.Server();
            server.connection({
                port: bus.config.port || 3000,
                host: bus.config.host || 'localhost'
            });
            server.start((err) => {
                if (err) {
                    reject(err);
                }
                console.log(`Server running at: ${server.info.uri}`);
                resolve();
            });
            server.register(require('inert'), (err) => {
                if (err) {
                    throw err;
                }
                server.route({
                    method: '*',
                    path: '/{name*}',
                    handler: function(request, reply) {
                        if (request.path === '/') {
                            request.path = '/' + 'index.html';
                        }
                        reply.file('./ui' + request.path);
                    }
                });
                server.route({
                    method: 'POST',
                    path: '/rpc',
                    handler: function(request, response) {
                        var throwErr = function(e) {
                            var bodyRes = {
                                id: body.id,
                                error: {
                                    message: e.message
                                }
                            };
                            if (bus.config.errorLog === 'trace') {
                                bodyRes.error.stack = e.stack;
                            }
                            return response((JSON.stringify(bodyRes))).code(200);
                        };
                        try {
                            var body = request.payload;
                            helper.validateRpcRequest(body)
                            .then(function() {
                                return bus.call(body.method, body.params)
                                .then(function(resp) {
                                    return response((JSON.stringify({
                                        id: body.id,
                                        result: resp
                                    }))).code(200);
                                })
                                .catch(throwErr);
                            })
                            .catch(throwErr);
                        } catch (e) {
                            return throwErr(e);
                        }
                    }
                });
                routes.forEach(function(route) {
                    server.route(route);
                });
            });
        });
    }
};
