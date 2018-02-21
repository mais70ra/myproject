const bus = {};
// const log = require("../../modules/log");
const log = (msg) => {
    console.log(msg);
}
const modules = require('../index').modules;
const ports = require('../index').ports;

const config = require('../dev.json');
var trace = 0;

module.exports = {
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
                modules[modulesKeys[mod]].init({
                    call: call,
                    config: this.config
                });
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
            if (ports[portsKeys[mod]]) {
                ports[portsKeys[mod]].init({
                    call: call,
                    config: config[portsKeys[mod]]
                }, ports[portsKeys[mod]].routes);
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
    call: call
};
var call = (...params) => {
    let method = params[0];
    if (bus.methods[method]) {
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
    } else {
        throw Error('Method not found');
    }
}