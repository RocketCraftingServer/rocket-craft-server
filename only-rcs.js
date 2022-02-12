
/**
 * @description  RocketCraftServer
 * REST API Server powered with
 * PWA Admin Panel.
 * @version 2022 VICTORY
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 */

 console.log("Initial params [3] => ", process.argv[3]);

 const ConfigAccountSession = require("./config");
 const config = new ConfigAccountSession(process.argv[3]);
 
 const MyDatabase = require("./database/database");
 let database = new MyDatabase(config);
 
 /**
  * @description Create if not exist 
  * all defined collections.
  * @collections 
  *  - users
  */
 database.populateDatabase();
 database.checkInitiallyDatabaseSize();
 
 /**
  * @description Seed fake users 
  * all defined collections.
  * No programibillity prevent double
  * seed. Just comment line manually.
  * @collections 
  *  - users
  */
 database.seedDatabase(3);
 
 // Check launch arguments: must receive URL (localhost) and the secret
 if (process.argv.length != 4) {
   console.log("Usage: node " + __filename + " . ");
   process.exit(-1);
 }
 
 // For demo purposes we ignore self-signed certificate
 // process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
 
 // http2 protocol
 const spdy = require("spdy");
 const compression = require("compression");
 const cors = require("cors");
 
 // Node imports
 var express = require("express");
 var fs = require("fs");
 
 const Crypto = require("./common/crypto");
 var crypto = new Crypto();
 
 // http1.1
 var https = require('https');
 var http = require('http');
 
 // Pull information from HTML POST (express4)
 var bodyParser = require("body-parser");
 const { endianness } = require( "os" );
 var app = express();
 var URL_ARG = process.argv[2];
 var options = null;
 
 /**
  * @description
  * Almost any undefined case use admin page for now
  */
 app.use(bodyParser.json({ limit: config.maxRequestSize }))
 app.use(cors());

 /**
  * @description Compression
  * @example
  *  app.use(compression({
  *    filter: function () { return true; }
  *  }));
  *  express.compress()
  */
 
 /**
  * @description  Allow or disallow headers flags.
  * Add headers
  */
 app.use(function (req, res, next) {
   // console.log("HOSTING SERVER PREVENT OTHER DOMAINS+")
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
 
 // Parse application/x-www-form-urlencoded
 app.use(
   bodyParser.urlencoded({
     extended: "true"
   })
 );
 
 // Parse application/json
 app.use(bodyParser.json());
 
 app.use(
   bodyParser.json({
     type: "application/vnd.api+json"
   })
 );
 
 // Parse application/vnd.api+json as json
 
 let routerRocket = new require('./api/account/account')(app, express, database, crypto);
 let routerUsers = new require('./api/users/users')(app, express, database, crypto);
 
 // Test - Not for production
 // let routerGeneric = new require('./api/generic/route')(app, express, database, crypto);
 
 let routerProfile = new require('./api/profile/profile')(
   app,
   express,
   { 
     dbName: config.databaseName,
     dbRoot: config.getDatabaseRoot,
     database: database
   },
   crypto
 );
 
 let routerProfileWannaPlay = new require('./api/crafting/active-list')(
   app,
   express,
   { 
     dbName: config.databaseName,
     dbRoot: config.getDatabaseRoot
   },
   crypto
 );
 
 // Server configuration - compression.
 // At the moment conflicted with client webworker cache feature.
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
  * For local pass arg `localhost`
  */
 if (URL_ARG.indexOf("localhost") !== -1) {
   options = {
     //key: fs.readFileSync(__dirname + "/self-cert/privatekey.pem"),
     //cert: fs.readFileSync(__dirname + "/self-cert/certificate.pem")
   };
 } else {
   options = {
     //key: fs.readFileSync("/etc/letsencrypt/live/maximumroulette.com/privkey.pem"),
     //cert: fs.readFileSync("/etc/letsencrypt/live/maximumroulette.com/fullchain.pem")
   };
 }
 
 /**
  * @description
  * Init on the end.
  */
 var serverRunner = null;
 
 if (config.protocol == 'http') {
   serverRunner = http;
 } else if (config.protocol == 'https') {
   serverRunner = https;
 } else if (config.protocol == 'http2') {
   serverRunner = spdy;
 }
 
 /**
  * @description
  * You can add samo special route for any proporse.
  */
 if (config.hostSpecialRoute.active) {
   app.use(express.static(config.hostSpecialRoute.route)); 
   console.log(
     "Rocket activate " +
     config.hostSpecialRoute.webAppName + " application host." +
     " Application www folder is `" + config.hostSpecialRoute.route)
 }

 /**
  * @description serverRunner
  * Run `rocket-crafting-server` web server.
  */
 serverRunner.createServer(options, app).listen(config.connectorPort, error => {
   if (error) {
     console.warn("Something wrong with rocket-crafting server.");
     console.error(error);
     return process.exit(1);
   } else {
     console.log("RocketCraftingServe `REGIME ONLY` started at " + config.connectorPort + " port.");
   }
 });