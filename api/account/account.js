
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

    var root = this;

    this.app.post("/rocket/login", (req, res) => {

      if (req.secure) {
        console.log("Good");
      };
    
      console.log("/rocket/login ", req.body);
      console.log("/rocket/login ", req.body.username);
    
      res.status(200).json({
        message: "POST /rocket/login",
        rocketStatus: "welcome"
      });
    
    })
    
    this.app.get("/rocket/user", (req, res) => {
    
      if (req.secure) {
      };
      console.log("Request req.headers.host = ", req.headers.host);
    
      res.status(300).json({
        message: "/rocket/user",
        rocketStatus: "login"
      });
    
    });
    
    this.app.post("/rocket/register", this.onRegisterResponse.bind(this));
    this.app.post("/rocket/confirmation", this.onRegValidationResponse.bind(this));
    
    /**
     * @description
     * Almost any undefined case use admin page for now
     */
    this.app.use(root.express.static(__dirname + "./../../public/dist"));

    console.log("RocketRoute loaded with success.");
  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRoute(app, express, dataAction, crypto) }
