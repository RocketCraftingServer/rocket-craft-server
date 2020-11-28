
const structureDataGenerator = require("./col")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRouteGenericStructureData extends structureDataGenerator {

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

    this.app.post("/rocket/global/generic/", this.onGeneratePostResponse.bind(this));
 
  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRoute(app, express, dataAction, crypto) }
