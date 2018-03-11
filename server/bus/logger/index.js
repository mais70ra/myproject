const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const rfs = require('rotating-file-stream');
// create a write stream (in append mode)
const logDirectory = path.join(process.cwd(), "log");

module.exports = {
  logger: () => {
    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // create a rotating write stream - rotate daily
    var accessLogStream = rfs("server.log", {
      interval: "1d",
      path: logDirectory
    });

    // Custom token with params and body of the request
    morgan.token("details", req => {
      const params = JSON.stringify(req.params);
      const body = JSON.stringify(req.body);

      return `${params} - ${body}`;
    });

    return morgan(":method :url :status - :response-time ms - :details", {
      stream: accessLogStream
    });
  }
};
