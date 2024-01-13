import http from "http";
import https from "https";
import fs from "node:fs";
import { app } from "./app";
import { logger } from "./utils/logger";
import { join } from "path";
//const morgan = require("morgan");
//const bodyParser = require("body-parser");

const options = {
    key: fs.readFileSync(join(__dirname, "../static/certs/key.pem")),
    cert: fs.readFileSync(join(__dirname, "../static/certs/cert.pem")),
    passphrase: "123456"
};

// const server = http.createServer(app).listen(80);
http.createServer(app).listen(80, () => logger.info("cache server started on port 80"));
https.createServer(options, app).listen(443, () => logger.info("game server started on port 443"));

// server.keepAliveTimeout = 60 * 1000 + 1000;
// server.headersTimeout = 60 * 1000 + 2000;
