const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const SessionHandler = require('../session');
var sessionHandler;

const helper = require("./helper");
const log = require("../logger");
const err = require("../error");

function Httpserver(bus) {
  this.bus = bus;
}

Httpserver.prototype.init = function(port) {
  let app = express();
  let bus = this.bus;
  var expressSession;
  var MemcachedStore;
  try {
    if (
      bus.config[bus.id].permission &&
      bus.config[bus.id].permission.loginMethod
    ) {
      sessionHandler = new SessionHandler(bus);
      expressSession = require("express-session");
      MemcachedStore = require("connect-memcached")(expressSession);
      app.use(cookieParser());
      app.use(
        expressSession({
          secret: bus.config[bus.id].permission.secret,
          cookie: { maxAge: bus.config[bus.id].permission.timeout },
          key: bus.config[bus.id].permission.key,
          proxy: bus.config[bus.id].permission.proxy,
          store: new MemcachedStore({
            hosts: [bus.config[bus.id].permission.memcachedStore.host + ':' +
            bus.config[bus.id].permission.memcachedStore.port], //this should be where your Memcached server is running
            secret: bus.config[bus.id].permission.memcachedStore.secret // Optionally use transparent encryption for memcache session data
          })
        })
      );
    }
    if (bus.config[bus.id].publicPath) {
      var public = path.join(
        process.cwd(),
        bus.config[bus.id].publicPath || "/ui/"
      );
      app.get("/", function(req, res) {
        res.sendFile(path.join(public + "index.html"));
      });
      app.use(express.static(path.resolve(public)));
      
      public = path.join(
        process.cwd(),
        "/translations"
      );
      app.use(express.static(path.resolve(public)));
    }
    
    app.use(log.logger());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.listen(bus.config[bus.id].port || 3000);
  } catch(e) {
    console.error(e); 
  }
  app.post("/rpc", (req, res) => {
    var throwErr = function(e) {
      err.throw(e).catch(e => {
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
        if (bus.config[bus.id].errorLog === "trace") {
          bodyRes.error.stack = e.stack;
        }
        return res.status(400).json(bodyRes);
      });
    };
    try {
      var body = req.body;
      helper
        .validateHeadersRequest(req.headers)
        .then(r => {
          return helper.validateRpcRequest(body);
        })
        .catch(throwErr)
        .then(function() {
          let outgoing = resp => {
            if (port.outgoing) {
              return port
                .outgoing({ id: body.id, result: resp })
                .then(resp => {
                  return res.status(200).json(resp);
                })
                .catch(throwErr);
            } else {
              return res.status(200).json({ id: body.id, result: resp });
            }
          };
          let incoming = () => {
            if (port.incoming) {
              return port.incoming(body.params, {
                id: body.id,
                headers: req.headers,
                method: body.method
              });
            } else {
              return Promise.resolve(body.params);
            }
          };
          let call = params => {
            if (
              bus.config[bus.id].permission &&
              bus.config[bus.id].permission.loginMethod
            ) {
              if (body.method === bus.config[bus.id].permission.loginMethod) {
                return bus.call(body.method, params, {
                    headers: req.headers
                  }).then(session => {
                    return sessionHandler
                      .createSession(req.session, {
                        data: session.data,
                        response: session.response
                      })
                      .then(() => {
                        return Promise.resolve(session.response);
                      });
                });
              } else if (body.method === bus.config[bus.id].permission.logoutMethod) {
                return sessionHandler
                .closeSession(req.session)
                .then(() => {
                  return {
                    resultCode: 0
                  };
                });
              } else if (bus.config[bus.id].publicMethods &&
                bus.config[bus.id].publicMethods.indexOf(body.method) > -1
              ) {
                return bus.call(body.method, params, {
                  headers: req.headers
                });
              } else if (body.method === bus.config[bus.id].permission.checkSession) {
                return sessionHandler
                .verifySession(req.session)
                .then((s) => {
                  return s.response;
                });
              } else {
                return sessionHandler
                  .verifySession(req.session)
                  .then((s) => {
                    return bus.call(body.method, params, {
                      session: s,
                      headers: req.headers
                    })
                    .then(r => {
                      if (r && r.updateSession) {
                        // req.session.save(Object.assign({}, r.updateSession, req.session.auth));
                        if (r.updateSession.response) {
                          Object.assign(req.session.auth.response, r.updateSession.response);
                        }
                        if (r.updateSession.data) {
                          Object.assign(req.session.auth.data, r.updateSession.data);
                        }
                        delete r.updateSession;
                      }
                      return r;
                    });
                  });
              }
            } else {
              return bus.call(body.method, params, {
                headers: req.headers
              });
            }
          };
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
};

module.exports = Httpserver;
