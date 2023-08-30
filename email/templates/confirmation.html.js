
module.exports = {

  /**
   * getConfirmationEmail simple returns local html in literal style.
   * No need for now to complicate with complicated plugins.
   * Keep it simple.
   * @param {string} userName
   * @param {string} token
   */
  getConfirmationEmail: function(token, userName) {
    return `
    <!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml"> 
        <head> 
          <title>RocketCraftingServer gameplay open source free platform</title> 
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
          <meta name="viewport" content="width=device-width" />
        </head>
        <body>
          <div style="background:linear-gradient(45deg, #ff6900, #d80000);color:white;height: 550px;font-size: large;padding: 20px;">
          <h3> Welcome to GamePlayPlatform powered project, <br /> 
            dear <span style="color: black" >` + userName + `</span>. </h3><br/>
          <p>Confirm you email address: <br/>
            Copy/Paste in your SignUp form.</p> <br/>
          <p>CODE: ` + token + `</p> <br /><br /><br />

          <small>Based on Safir and RocketCraftingServer projects.</small>
          <img style="width:80px;" src="https://github.com/zlatnaspirala/safir/blob/main/hello/assets/icons/192.png?raw=true"/>
          <small>Get source code at https://github.com/zlatnaspirala<small>
          <small>Powered by maximumroulette.com 2023</small>
        </div>
        </body>
        </html>`;
  }
}