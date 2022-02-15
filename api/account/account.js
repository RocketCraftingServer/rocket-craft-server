
const ResponseHandler = require("./handler")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRoute extends ResponseHandler {

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

    this.app.post("/rocket/login", this.onLoginResponse.bind(this));
    this.app.post("/rocket/register", this.onRegisterResponse.bind(this));
    this.app.post("/rocket/confirmation", this.onRegValidationResponse.bind(this));
    this.app.post("/rocket/forgot-pass", this.onForgotNewPassworkResponse.bind(this));
    this.app.post("/rocket/set-new-pass", this.onSetNewPassworkResponse.bind(this));
    console.log("RocketRoute for account loaded with success.");

  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRoute(app, express, dataAction, crypto) }
