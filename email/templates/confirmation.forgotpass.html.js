
module.exports = {

  /**
   * @description getConfirmationEmail simple returns local
   * html in literal style. No need for now to complicate 
   * with complicated plugins. Keep it simple.
   * @param {string} userName
   * @param {string} token
   */
  getConfirmationForgotPass: function(token, userName) {
    return "<div \
      style='background:#000000;color:orange;height: 700px;font-size: large;  \
      padding: 20px;' > \
      <h2> - RocketCraftingServer platform - </h2> \
      Forgot Password comfirmation email. <br/> \
      <h3>Dear " + userName + ". </h3><br/> \
      <p>You will need this CODE to confirm your new password: <br/> \
      Copy/Paste in your Forgot password form.</p> <br/> \
      CODE : <h2>" + token + "</h2>  <br/><br/><br/> \
      <i>Rocket Craft Project</i> \
      <img style='width:80px;' src='https://maximumroulette.com:2020/images/icons/favicon-96x96.png' /> \
      Powered by <small>https://maximumroulette.com software platforms. </small> \
      zlatnaspirala 2022 \
      <br/>\
      </div>";
  }

}
