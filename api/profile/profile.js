
const ResponseHandler = require("./profile-handler")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRouteProfile extends ResponseHandler {

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

    this.app.post("/rocket/profile", this.getProfileResponse.bind(this));
    this.app.post("/rocket/profile/newNickname", this.profileNewNickname.bind(this));
    console.log("getProfileResponse loaded with success.");

  }

}

module.exports = (app, express, dataOptions, crypto) => { return new RocketRouteProfile(app, express, dataOptions, crypto) }
