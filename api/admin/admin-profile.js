
const ResponseHandler = require("./admin-profile-handler");

/**
 * @description Class alias RocketRoute
 * RocketRouteProfileAdmin
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `rocket/profile-delete`.
 */
class RocketRouteProfileAdmin extends ResponseHandler {

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
    // Only admin permission
    this.app.post("/rocket/profile-delete", this.ProfileDeleteResponse.bind(this));
    // this.app.post("/rocket/profile-ban", this.ProfileDeleteResponse.bind(this));
    console.log("RocketRouteProfileAdmin loaded with success.");
  }

}

module.exports = (app, express, dataOptions, crypto) => { return new RocketRouteProfileAdmin(app, express, dataOptions, crypto) }
