
module.exports = {

  /**
   * @description getConfirmationEmail simple returns local
   * html in literal style. No need for now to complicate 
   * with complicated plugins. Keep it simple.
   * @param {string} userName
   * @param {string} token
   */
  getConfirmationForgotPass: function(token, userName) {
    return "<div style='background:linear-gradient(45deg, #ff6900, #d80000);color:white;font-size: large;padding: 20px;'> \
      <h2> - RocketCraftingServer platform - </h2> \
      Forgot Password confirmation email. <br/> \
      <h3>Dear " + userName + ". </h3><br/> \
      <p>You will need this CODE to confirm your new password: <br/> \
      Copy/Paste in your Forgot password form.</p> <br/> \
      CODE : <h2>" + token + "</h2>  <br/><br/><br/> \
      <small>Based on Safir and RocketCraftingServer projects.</small> \
      <img style='width:80px;' src='https://github.com/zlatnaspirala/safir/blob/main/hello/assets/icons/192.png?raw=true'/> \
      <small>Get source code at https://github.com/zlatnaspirala<small> \
      <small>Powered by maximumroulette.com 2023</small> \
      <br/>\
      </div>";
  }

}
