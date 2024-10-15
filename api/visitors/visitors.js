
const ResponseHandler = require("./visitors-handler")

/**
 * @description Class RocketRoute
 * `api/visitors`.
 */
class RocketRouteVisitors extends ResponseHandler {

	/**
	 * @description 
	 * Keep it simple.
	 */
	constructor(app, express, dataOptions, crypto) {
		super(crypto, dataOptions);
		this.app = app;
		this.express = express;
		this.dataOptions = dataOptions;
		this.routeRegister();
	}

	routeRegister() {
		this.app.post("/rocket/visitors", this.getResponseVisitors.bind(this));
		console.info("visitors route loaded.");
	}

}

module.exports = (app, express, dataOptions, crypto) => {return new RocketRouteVisitors(app, express, dataOptions, crypto)}
