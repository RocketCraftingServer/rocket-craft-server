var express = require("express");
const cors = require("cors");
var https = require('https');
var bodyParser = require("body-parser");
var http = require('http');
var fs = require("fs");
var hostingHTTP = express();
var URL_ARG = process.argv[2];
let options = null;

if(URL_ARG.indexOf("localhost") !== -1) {
	console.log('Dev regime is active...');
	options = {
		key: fs.readFileSync(__dirname + "/self-cert/privatekey.pem"),
		cert: fs.readFileSync(__dirname + "/self-cert/certificate.pem")
	};
} else {
	options = {
		key: fs.readFileSync("/etc/letsencrypt/live/[YOR_OWN_DOMAIN_ENTER_HERE]/privkey.pem"),
		cert: fs.readFileSync("/etc/letsencrypt/live/[YOR_OWN_DOMAIN_ENTER_HERE]/fullchain.pem")
	};
}

hostingHTTP.get('*', function(req, res, next) {
	console.log(":", req.hostname);
	next();
});
hostingHTTP.use(express.static("G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\matrix-engine-starter\\projects\\matrix-roulette\\server\\"));
hostingHTTP.use(cors());
hostingHTTP.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', false);
	next();
});
hostingHTTP.use(bodyParser.json());

let facts = [];
const matrixRouletteCore = require("./core.js");
matrixRouletteCore.clients = [];
matrixRouletteCore.init();

hostingHTTP.get('/matrix-roulette-status', (request, response) => response.json({clients: matrixRouletteCore.clients.length}));

function eventsHandler(request, response, next) {
	const headers = {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	};
	response.writeHead(200, headers);
	const data = `data: ${JSON.stringify(facts)}\n\n`;
	response.write(data);
	const clientId = Date.now();
	const newClient = {id: clientId, response};
	matrixRouletteCore.clients.push(newClient);
	request.on('close', () => {
		console.log(`${clientId} Connection closed`);
		matrixRouletteCore.clients = matrixRouletteCore.clients.filter(client => client.id !== clientId);
	});
}

hostingHTTP.get('/matrix-roulette', eventsHandler);

https.createServer(options, hostingHTTP).listen(8080, error => {
	if(error) {
		console.warn("Something wrong with rocket-craft own host server.");
		console.error(error);
		return process.exit(1);
	} else {
		console.info("Basic matrix-roulette-server started at " + 8080 + " port.");
		console.info("You can implement also intro your own (already existing) server host.");
	}
});