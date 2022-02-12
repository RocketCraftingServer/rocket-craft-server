module.exports = {
  resolveURL: function(url) {
    const isWin = !!process.platform.match(/^win/);
    if (!isWin) {
      return url;
    }
    return url.replace(/\//g, "\\");
  },

  validateEmail: function(email) {
    // tslint:disable-next-line:max-line-length
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regexp.test(email) === false) {
      return "Email is not valid !";
    }
    return null;
  },

  validatePassword: function(pass) {
    if (pass.length < 8) {
      return false;
    }
    return true;
  },

  myBase: {},

  generateToken: function(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  formatUserKeyLiteral(userEmail) {
    let local = userEmail;
    local = local.replace("@", "_alpha_");
    let encoded = Buffer.from(local).toString("base64");
    encoded = encoded.replace(/=/g, "ab");
    return encoded;
  },

  getDefaultNickName() {
    return Math.random().toFixed(0);
  },

  getRandomIntFromTo(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};
