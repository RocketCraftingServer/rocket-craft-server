var action = require("./action");

class ResponseHandler {

  constructor(crypto, dataOptions) {
    this.crypto = crypto;
    this.dataOptions = dataOptions;
  }

  async profileNewNickname(req, res) {

    if (typeof req.body.token !== 'undefined') {
                
      var user = {
        token: req.body.token,
        email: req.body.email,
        newNickname: req.body.newNickname
      };
      
      var responseFlag = await this.dataOptions.database.setNewNickname(user)
      console.log("/rocket/profile/newNickname", responseFlag.status);
      if (responseFlag.status == "NICKNAME_CHANGED") {
        res.status(200).json({
          message: "new nickname !",
          rocketStatus: responseFlag.status,
        });
      } else {
        res.status(401).json({
          message: "NO AUTHORIZED nickname",
          rocketStatus: "Very bad request nickname"
        });
      }
      
    } else {
      console.log("/rocket/profile/newNickname There is no exspected props in request body.");
      res.status(400).json({
        message: "There is no exspected props in request body.",
        rocketStatus: "Bad request"
      });
      return;
    }

  }

  async getProfileResponse(req, res) {

      // console.log("/rocket/profile ", req.body);
      if (typeof req.body.token !== 'undefined') {
                
        var user = {
          token: req.body.token,
          email: req.body.email
        };
        
        var responseFlag = await action.getUserProfile(user, this.dataOptions)
        console.log("/rocket/profile", responseFlag.status);
        if (responseFlag.status == "AUTHORIZED") {
          res.status(200).json({
            message: "Welcome to your profile dashboard",
            rocketStatus: responseFlag.status,
            user: responseFlag.user
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
