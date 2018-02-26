const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const helper = require('./helper');
const log = require('../log');
const err = require('../error');

function Httpserver (bus) {
  this.bus = bus;
};

Httpserver.prototype.init = function(port) {
    let app = express();
    let bus = this.bus;
    if (bus.config.publicPath) {
      var public = path.join(process.cwd(), bus.config.publicPath || '/ui/');
      app.get('/', function(req, res) {
        res.sendFile(path.join(public + 'index.html'));
      });
      app.use(express.static(path.resolve(public)));
    }
    app.use(log.logger());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.listen(bus.config.port || 3000);
    app.post('/rpc', (req, res) => {
      var throwErr = function(e) {
        err.throw(e)
        .catch(e => {
          var bodyRes = {
            id: body.id,
            error: {
              code: e.code,
              message: e.message
            }
          };
          if (e.errors) {
            bodyRes.error.errors = e.errors;
          }
          if (bus.config.errorLog === 'trace') {
            bodyRes.error.stack = e.stack;
          }
          return res.status(400).json(bodyRes);
        });
      };
      try {
        var body = req.body;
        helper.validateHeadersRequest(req.headers)
          .then((r) => {
            return helper.validateRpcRequest(body);
          })
          .catch(throwErr)
          .then(function() {
            let outgoing = (resp) => {
              if (port.outgoing) {
                return port.outgoing(resp).then(resp => {
                  return res.status(200).json({id: body.id, result: resp});
                }).catch(throwErr);
              } else {
                return res.status(200).json({id: body.id, result: resp});
              }
            };
            let incoming = () => {
              if (port.incoming) {
                return port.incoming(body.params, {id: body.id, headers: req.headers, method: body.method})
              } else {
                return Promise.resolve(body.params);
              }
            };
            let call = (params) => {
              return bus.call(body.method, params);
            }
            return incoming()
            .then(call)
            .then(outgoing)
            .catch(throwErr);
          });
      } catch (e) {
        return throwErr(e);
      }
    });
    return Promise.resolve(true);
}

module.exports = Httpserver;
