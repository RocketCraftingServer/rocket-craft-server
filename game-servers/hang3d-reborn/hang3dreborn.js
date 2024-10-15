
const ResponseHandler = require("./handler")

/**
 * @description Class RocketRoute
 * `api/visitors`.
 */
class RocketHANG3DREBORN extends ResponseHandler {

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
		this.app.post("/hang3dreborn/join", this.getResponseVisitors.bind(this));
		console.info("visitors route loaded.");
	}

}

module.exports = (app, express, dataOptions, crypto) => {return new RocketHANG3DREBORN(app, express, dataOptions, crypto)}
