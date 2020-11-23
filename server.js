
/**
 * PWA Powered REST API Server
 * @author Nikola Lukic 
 * @email zlatnaspirala@gmail.com
 */

const ConfigAccountSession = require("./config");
const config = new ConfigAccountSession();

// Check launch arguments: must receive URL (localhost) and the secret
if (process.argv.length != 4) {
  console.log("Usage: node " + __filename + " . ");
  process.exit(-1);
}

// For demo purposes we ignore self-signed certificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// http2 protocol
const spdy = require("spdy");
const path = require("path");
var compression = require("compression");
var cors = require("cors");

// Node imports
var express = require("express");
var fs = require("fs");

var https = require('https');
var http = require('http');

// Pull information from HTML POST (express4)
var bodyParser = require("body-parser"); 
var app = express();
var URL_ARG = process.argv[2];
var options = null;

app.use(cors());

// express.compress()
/*app.use(compression({
  filter: function () { return true; }
}));
*/

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: "true"
  })
);
// Parse application/x-www-form-urlencoded

// Parse application/json
app.use(bodyParser.json()); 

app.use(
  bodyParser.json({
    type: "application/vnd.api+json"
  })
);

// Parse application/vnd.api+json as json
// app.use(cors());

app.post("/rocket/login", (req, res) => {

  if (req.secure) {
    console.log("Good");
  };

  console.log("/rocket/login ", req.body);

  console.log("/rocket/login ", req.body.username);

  res.status(200).json({
    message: "POST /rocket/login",
    rocketStatus: "welcome"
  });

})

app.get("/rocket/user", (req, res) => {

  if (req.secure) {
  };
  console.log("Request req.headers.host = ", req.headers.host);

  res.status(300).json({
    message: "/rocket/user",
    rocketStatus: "login"
  });

});

/**
 * @description
 * Almost any case
 */
app.post("/rocket/register", (req, res) => {

  console.log("POST DETECTED");
  if (req.secure) {
    console.log("SECURED!");
  };

  console.log("/rocket/register ", req.headers);

  // Test native cors,
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Accept-Encoding', 'deflate, gzip;q=1.0, *;q=0.5');
  res.header('Cache-Control', 'public, max-age=31557600');

  // res.redirect('https://' + req.headers.host + req.url);

  res.status(200).json({
    message: "ok",
    rocketStatus: "cheking client signal"
  });

});

app.use(express.static(__dirname + "/public/dist")); // Set the static files location

// Server configuration
// app.use(express.static(__dirname + "/public"));
// app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

/**
 * @description 
 * Forsed https for now.
 */

if (URL_ARG.indexOf("localhost") !== -1) {
  options = {
    key: fs.readFileSync(__dirname + "/self-cert/privatekey.pem"),
    cert: fs.readFileSync(__dirname + "/self-cert/certificate.pem")
  };
} else {
  options = {
    key: fs.readFileSync("/etc/httpd/conf/ssl/maximumroulette.com.key"),
    cert: fs.readFileSync("/etc/httpd/conf/ssl/maximumroulette_com.crt")
  };
}

/**
 * @description
 * Init on the end.
 */
https.createServer(options, app).listen(config.connectorPort, error => {
  if (error) {
    console.warn("Something wrong with rocket-craft server.")
    console.error(error);
    return process.exit(1);
  } else {
    console.log("ROCKET LAUNCH ON PORT " + config.connectorPort + ". Good luck ...");
  }
});

/**
 * @description
 * If any reason for classic http 1.1
 * use https.createServer(options, app).listen(port);
 */
