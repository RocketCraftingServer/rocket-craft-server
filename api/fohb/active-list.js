
const ResponseHandler = require("./active-list-handler")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRouteActiveList extends ResponseHandler {

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
		/**Related to the ActiveList only for IP HOST/CLIENT reason */
		this.app.post("/rocket/fohbstart", this.fohbStart.bind(this));
		console.info("fohbStart created");
	}

}

module.exports = (app, express, dataOptions, crypto) => {return new RocketRouteActiveList(app, express, dataOptions, crypto)}
