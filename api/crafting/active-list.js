
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
    this.app.post("/rocket/remove-from-server-list", this.getResponseRemoveFromServerList.bind(this));
    this.app.post("/rocket/leaderboard", this.getResponseLeaderboard.bind(this));
		this.app.post("/rocket/public-leaderboard", this.getResponsePublicLeaderboard.bind(this));
    this.app.post("/rocket/point-plus10", this.getResponsePointPlus10.bind(this));
    this.app.post("/rocket/dead", this.getResponseDead.bind(this));
    console.info("Wanna play route loaded.");
  }

}

module.exports = (app, express, dataOptions, crypto) => {return new RocketRouteActiveList(app, express, dataOptions, crypto)}
