
class ResponseHandler {

  constructor(crypto) {
    this.crypto = crypto;
  }

  async onRegisterResponse(req, res) {
    
      if (req.secure) {
        // console.log("S");
      };
    
      console.log("/rocket/register ", req.body.emailField);    
      if (typeof req.body.emailField !== 'undefined' & typeof req.body.passwordField !== 'undefined' ) {
                
        var user = {
          email: req.body.emailField,
          password: req.body.passwordField
        };
        
        var responseFlag = await this.dataAction.register(user, this)
        console.log("/rocket/register responseFlag ", responseFlag);
        if (responseFlag.status == "USER_ALREADY_REGISTERED") {
          res.status(200).json({
            message: "maybe very bad request",
            rocketStatus: responseFlag.status 
          });
        } else if (responseFlag.status == "USER_REGISTERED") {

          let emailRegBody = require("./../../email/templates/confirmation.html").getConfirmationEmail;
          let contentRegBody = emailRegBody(responseFlag.token, responseFlag.email);
          let emailConnection = null;

          try {
            emailConnection = require("./../../email/mail-service")
              (responseFlag.email, responseFlag.status, contentRegBody).SEND(responseFlag.email);
          } catch (error) {

            console.warn("Connector error in sending reg email!", error);
            console.log("Email reg error. Notify client.");

          } finally {

            emailConnection.then((data) => {
              res.status(200).json({
                message: "Check email for conmfirmation key.",
                rocketStatus: "USER_REGISTERED"
              });
              console.log("Email reg sended. Notify client.");
            }).catch((error) => {
              console.log("Error in sending email procedure: " + error);
              res.status(201).json({
                message: "Check email for conmfirmation key.",
                rocketStatus: "USER_REGISTERED"
              });
            });
          }
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
