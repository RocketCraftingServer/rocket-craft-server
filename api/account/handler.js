
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
                rocketStatus: "USER_REGISTERED",
                email: responseFlag.email
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

  async onRegValidationResponse(req, res) {

    var user = {
      email: req.body.emailField,
      token: req.body.tokenField
    };

    var responseFlag = await this.dataAction.regValidator(user, this)
    // console.log("/rocket/confirmation responseFlag ", responseFlag);

    if (responseFlag.result !== null) {
      // console.log("/rocket/confirmation passed ", responseFlag.email);
      res.status(200).json({
        message: "Confirmation done.",
        rocketStatus: "USER_CONFIRMED",
        accessToken: responseFlag.token
      });
    } else {
      res.status(202).json({
        message: "Wrong confirmation code.",
        rocketStatus: "USER_NOT_CONFIRMED"
      });
    }

  }

  async onLoginResponse(req, res) {
    
    if (req.secure) {
      console.log("Secured.");
    };
  
    console.log("/rocket/register ", req.body.emailField);    
    if (typeof req.body.emailField !== 'undefined' & typeof req.body.passwordField !== 'undefined' ) {
              
      var user = {
        email: req.body.emailField,
        password: req.body.passwordField
      };
      
      var responseFlag = await this.dataAction.loginUser(user, this)
      console.log("/rocket/login => ", responseFlag);
      if (responseFlag.status == "USER_LOGGED") {

        res.status(200).json({
          message: "User logged",
          rocketStatus: responseFlag.status,
          flag: responseFlag,
        });
        
      } else {

        res.status(300).json({
          message: "Wrong Password",
          rocketStatus: "no-session"
        });

      }
  }

}

}

module.exports = ResponseHandler
