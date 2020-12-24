
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

    this.app.post("/rocket/active-games", this.getServerListResponse.bind(this));
    this.app.post("/rocket/wanna-play", this.getResponse.bind(this));
    console.log("wanna play route reg. loaded with success.");

  }

}

module.exports = (app, express, dataOptions, crypto) => { return new RocketRouteActiveList(app, express, dataOptions, crypto) }
