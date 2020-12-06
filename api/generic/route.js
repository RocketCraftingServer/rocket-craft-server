
const StructureDataGenerator = require("./handler")

/**
 * @description Class RocketRoute
 * is place for definition of route jobs
 * also ResponseHandler comes in same folder
 * with one route api collections egg.
 * `api/account`.
 */
class RocketRouteGenericStructureData extends StructureDataGenerator {

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
    
    console.log("RocketRouteGenericStructureData loaded with success.");
  }

  routeRegister() {

    this.app.get("/rocket/global/generic/", this.onGeneratePostResponse.bind(this));
    // this.app.post("/rocket/global/generic/", this.onGeneratePostResponse.bind(this));
 
  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRouteGenericStructureData(app, express, dataAction, crypto) }
