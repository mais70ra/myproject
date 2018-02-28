const bus = {};
// const log = require("../../modules/log");
const log = (msg) => {
    console.log(msg);
}
const modules = require('../index').modules;
const ports = require('../index').ports;
const Db = require('./db');
const Httpserver = require('./httpserver');

const config = require('../dev.json');
var trace = 0;

var methodExist = (method) => {
    if (bus.methods[method]) {
        return Promise.resolve(true);
    } else {
        return Promise.reject('method_not_found');
    }
};

var call = (...params) => {
    let method = params[0];
    return methodExist(method)
    .then(() => {
        try {
            var module = method.split('.')[0];
            var pid = trace++;
            params = Array.prototype.slice.call(params, 1);
            if (config[module] && config[module].log === 'trace') {
                log({
                    io: 'request',
                    pid: pid,
                    method: method,
                    params: params
                });
            }
            return bus.methods[method].apply(undefined, params)
            .then((r) => {
                if (config[module] && config[module].log === 'trace') {
                    log({
                        io: 'response',
                        pid: pid,
                        method: method,
                        params: params
                    });
                }
                return Promise.resolve(r);
            })
            .catch((e) => {
                if (config[module] && config[module].log === 'trace') {
                    log({
                        io: 'error',
                        pid: pid,
                        method: method,
                        params: e
                    });
                }
                return Promise.reject(e);
            });
        } catch (e) {
            log({
                io: 'error',
                pid: pid,
                method: method,
                params: {
                    error: e.message,
                    stack: e.stack
                }
            });
            throw e;
        }
    });
}

var app = {
    config: config,
    init: () => {
        bus.methods = {};
        var modulesKeys = Object.keys(modules);
        for (var mod in modulesKeys) {
            if (modules[modulesKeys[mod]]) {
                var funKeys = Object.keys(modules[modulesKeys[mod]]);
                for (var fun in funKeys) {
                    if (modules[modulesKeys[mod]][funKeys[fun]] && (['init', 'routes', 'type'].indexOf(funKeys[fun]) === -1)) {
                        bus.methods[modulesKeys[mod] + '.' + funKeys[fun]] = modules[modulesKeys[mod]][funKeys[fun]];
                    }
                }
            }
        }
        for (mod in modulesKeys) {
            if (modules[modulesKeys[mod]] && modules[modulesKeys[mod]].init) {
                modules[modulesKeys[mod]].init(Object.assign({}, app, {
                    id: modulesKeys[mod]
                }));
            }
        }
        var portsKeys = Object.keys(ports);
        for (mod in portsKeys) {
            if (ports[portsKeys[mod]]) {
                funKeys = Object.keys(ports[portsKeys[mod]]);
                for (fun in funKeys) {
                    if (ports[portsKeys[mod]][funKeys[fun]] && (['init', 'routes', 'type'].indexOf(funKeys[fun]) === -1)) {
                        bus.methods[portsKeys[mod] + '.' + funKeys[fun]] = ports[portsKeys[mod]][funKeys[fun]];
                    }
                }
            }
        }
        for (mod in portsKeys) {
            if (ports[portsKeys[mod]].type === 'httpserver') {
                let httpserver = new Httpserver(Object.assign({}, app, {
                    id: portsKeys[mod]
                }));
                httpserver.init(ports[portsKeys[mod]])
                .then(() => {
                    ports[portsKeys[mod]].init(Object.assign({}, app, {
                        id: portsKeys[mod]
                    }));
                });
            } else if (ports[portsKeys[mod]].type === 'db') {
                if (!Array.isArray(ports[portsKeys[mod]].definitions)) {
                    throw new Error('Missing definitions in the db port ' + mod);
                }
                let db = new Db(Object.assign({}, app, {
                    id: portsKeys[mod]
                }));
                db.init(JSON.parse(JSON.stringify(ports[portsKeys[mod]].definitions)))
                .then(() => {
                    bus.methods[portsKeys[mod] + '.send'] = db.send;
                    ports[portsKeys[mod]].init(Object.assign({}, app, {
                        id: portsKeys[mod]
                    }));
                });
            } else {
                log({
                    io: 'error',
                    type: 'port',
                    name: portsKeys[mod],
                    e: 'Port type not found:' + ports[portsKeys[mod]].type
                });
            }
        }
    },
    call: call,
    methodExist: methodExist
};

module.exports = app;
