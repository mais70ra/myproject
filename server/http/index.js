const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helper = require("./helper");
const log = require("../../modules/log");
const err = require("../../modules/error");

module.exports = {
  init: function(bus, routes) {
    return new Promise((resolve, reject) => {
      var app = express();
      if (bus.config.publicPath) {
        var public = path.join(process.cwd(), bus.config.publicPath || "/ui/");
        app.get("/", function(req, res) {
          res.sendFile(path.join(public + "index.html"));
        });
        app.use(express.static(path.resolve(public)));
      }
      app.use(log.logger());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(cookieParser());
      app.listen(bus.config.port || 3000);

      app.post("/rpc", (req, res) => {
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
            if (bus.config.errorLog === "trace") {
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
            .then(function() {
              return bus
                .call(body.method, body.params)
                .then(function(resp) {
                  return res.status(200).json({
                      id: body.id,
                      result: resp
                    });
                })
                .catch(throwErr);
            })
            .catch(throwErr);
        } catch (e) {
          return throwErr(e);
        }
      });
    });
  }
};
