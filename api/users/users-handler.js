
class ResponseHandler {

  constructor(crypto) {
    this.crypto = crypto;
  }

  async getUsersResponse(req, res) {
    
      if (req.secure) {
        // console.log("S");
      };
    
      console.log("/rocket/users ", req.body);

      if (typeof req.body.token !== 'undefined') {
                
        var user = {
          token: req.body.token,
          size: 200,
          i: 1,
          criterium: req.body.criterium
        };
        
        console.log("/rocket/users ENTER ", req.body);

        var responseFlag = await this.dataAction.getUsersList(user, this)
        console.log("/rocket/users", responseFlag.status);

        if (responseFlag.status == "AUTHORIZED") {
          res.status(200).json({
            message: "get users response",
            rocketStatus: responseFlag.status,
            users: responseFlag.users
          });
        } else {
          res.status(400).json({
            message: "NO AUTHORIZED",
            rocketStatus: "bad request"
          });
        }
        
        
      } else {

        console.log("/rocket/register There is no exspected props in request body.");

        res.status(400).json({
          message: "There is no exspected props in request body.",
          rocketStatus: "bad request"
        });
        return;

      }
  }
 
}

module.exports = ResponseHandler
