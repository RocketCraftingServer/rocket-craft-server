
const ResponseHandler = require("./users-handler")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRouteGetUsers extends ResponseHandler {

  /**
   * @description 
   * Keep it simple.
   */
  constructor(app, express, dataAction, crypto) {

    super(crypto);

    this.app = app;
    this.express = express;
    this.dataAction = dataAction;

    this.routeRegister();
    
  }

  routeRegister() {

    this.app.post("/rocket/users", this.getUsersResponse.bind(this));
    console.log("RocketRouteGetUsers loaded with success.");

  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRouteGetUsers(app, express, dataAction, crypto) }
