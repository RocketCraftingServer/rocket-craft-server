var action = require("./action");

// Only admin permission
class ResponseHandler {

  constructor(crypto, dataOptions) {
    this.crypto = crypto;
    this.dataOptions = dataOptions;
  }

  async ProfileDeleteResponse(req, res) {

      console.log("/rocket/profile-delete", req.body);
      if (typeof req.body.token !== 'undefined') {
        var user = {
          token: req.body.token,
          email: req.body.email,
          deleteUserId: req.body.deleteUserId
        };
        var responseFlag = await action.deleteUserProfile(user, this.dataOptions)
        console.log("/rocket/profile-delete STATUS", responseFlag.status);
        if (responseFlag.status == "AUTHORIZED") {
          res.status(200).json({
            message: "User profile deleted",
            rocketStatus: responseFlag.status,
            user: responseFlag.user
          });
        } else {
          res.status(401).json({
            message: "NO AUTHORIZED",
            rocketStatus: "Very bad request"
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
