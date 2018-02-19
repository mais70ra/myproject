const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const helper = require("./helper");
const log = require("../../modules/log");

module.exports = {
  start: function(bus, routes) {
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
          var bodyRes = {
            id: body.id,
            error: {
              message: e.message
            }
          };
          if (bus.config.errorLog === "trace") {
            bodyRes.error.stack = e.stack;
          }
          return response(JSON.stringify(bodyRes)).code(200);
        };
        try {
          var body = request.payload;
          helper
            .validateRpcRequest(body)
            .then(function() {
              return bus
                .call(body.method, body.params)
                .then(function(resp) {
                  return response(
                    JSON.stringify({
                      id: body.id,
                      result: resp
                    })
                  ).code(200);
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
