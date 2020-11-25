
const path = require("path");

/**
 * @description Class RocketRoute
 * is place for definition of route jobs.
 */
class RocketRoute {

  constructor(app, express, dataAction, crypto) {

    this.app = app;
    this.express = express;
    this.dataAction = dataAction;
    this.handler = new require("./handler")(crypto, this);

    this.routeRegister();
    
  }

  testCall () {
    console.log("TEST CALL...................RocketRoute")
  }

  onRegisterResponse(data) {
    
  }

  routeRegister() {
    
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
    
    this.app.post("/rocket/register", (req, res) => {
    
      if (req.secure) {
        console.log("SECURED!");
      };
    
      console.log("/rocket/register ", req.body.emailField);
    
      if (typeof req.body.emailField !== 'undefined' & typeof req.body.passwordField !== 'undefined' ) {
                
        var user = {
          email: req.body.emailField,
          password: req.body.passwordField
        };

        
        var TEST = await this.dataAction.register(user, this.handler)
        console.log("/rocket/register WAIT ", TEST);

        
      } else {

        console.log("/rocket/register There is no exspected props in request body.");

        res.status(400).json({
          message: "ok",
          rocketStatus: "bad request"
        });
        return;

      }

      res.status(200).json({
        message: "ok",
        rocketStatus: "client register signal...."
      });
    
    });
    
    /**
     * @description
     * Almost any undefined case use admin page for now
     */
    var root = this;
    this.app.use(root.express.static(__dirname + "./../../public/dist"));

    console.log("Loaded...................RocketRoute");
  }

}

module.exports = (app, express, dataAction, crypto) => { return new RocketRoute(app, express, dataAction, crypto) }
