var action = require("./action");

class ResponseHandler {

  constructor(crypto, dataOptions) {
    this.crypto = crypto;
    this.dataOptions = dataOptions;
  }

  async fohbStart(req, res) {
    console.log("rocket/fohb-start/ ", req.body);
    if(typeof req.body.token !== 'undefined') {
      var user = {
        token: req.body.token,
        email: req.body.email,
        myIp: req.connection.remoteAddress
      };
      // console.info( "req.connection.remoteAddress: ", req.connection.remoteAddress)
      var responseFlag = await action.gameplayStarted(user, this.dataOptions)
      console.info("/rocket/fohb-start/", responseFlag.status);
      if(responseFlag.status == "OK") {
        res.status(200).json({
          message: "fohb-start now." + Date().now(),
          rocketStatus: responseFlag.status
        });
      } else {
        res.status(401).json({
          message: "NO AUTHORIZED",
          rocketStatus: "very bad request"
        });
      }

    } else {
      console.log("/rocket/register There is no exspected props in request body.");
      res.status(400).json({
        message: "There is no exspected props in request body.",
        rocketStatus: "Bad request"
      });
      return;
    }
  }

}

module.exports = ResponseHandler
