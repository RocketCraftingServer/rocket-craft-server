/**
 * @description Define backend staff here.
 * @param serverMode { `dev` or `prod` }
 * @param networkDeepLogs { Boolean }
 * @param connectorPort { number }
 */

 class ServerConfig {

  constructor(serverModeArg) {
  
    if (typeof serverModeArg === 'undefined') {
      this.serverMode = "dev";
    } else if (serverModeArg == 'prod' ||
               serverModeArg == 'secured' ||
               serverModeArg == 'dev' ||
               serverModeArg == 'mongodb.net') {
      this.serverMode = serverModeArg;
    } else {
      console.error("Something wrong with Config arg!")
      return;
    }

    console.info(" --------------------------------------------");
    console.info(" -> Server running under " + this.serverMode + " configuration.");
    if (this.serverMode == "dev") {
      console.info(" -> domain dev:", this.domain.dev);
    } else if (this.serverMode == "prod" || this.serverMode == "secured" ) {
      console.info(" -> domain prod:", this.domain.prod);
    }
    console.info(" -> masterServerKey:", this.masterServerKey);
    console.info(" -> connectorPort:", this.connectorPort);
    console.info(" -> protocol:", this.protocol);
    console.info(" -> databaseName:", this.databaseName);
    console.info(" --------------------------------------------");
  }

  get hostAdminPanel() {
    return true;
  }

  get storageDir() {
    return "admin-panel/dist/storage";
  }

  /**
   * @description 
   * If you want to use api host also for 
   * hosting any web folders contents.
   */
  get hostSpecialRoute() {
    return {
      active: true,
      route: "/var/applications/rocket/rocket-craft-server/admin-panel/dist", // My VPS Linux
      route2: "/var/www/html/apps/safir/", // My VPS Linux
      //dev
      // route3: "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\ROCKET-SERVER\\rocket-craft-server\\admin-panel\\dist", // My admin - this repo windows
      route3: "/var/applications/rocket/rocket-craft-server/admin-panel/dist/storage/",
      // route: "G:\\web_server\\xampp\\htdocs\\PRIVATE_SERVER\\SERBON\\safir\\test\\dist", // compbine with safir clietn lib.
      webAppName: "ADMIN PANEL",
      type: "admin",
      unsecured: true,
    }
  }

  get ownHttp() {
    return true;
  }

  get ownHttpHostPort() {
    return 443;
  }

  get networkDeepLogs() {
    return  false;
  }

  get domain() {
    return  {
      dev: "localhost",
      prod: "maximumroulette.com"
    };
  };

  get masterServerKey() {
    return "rocket-server-app-database";
  }

  get protocol() {
    return "http";
  }

  get maxRequestSize() {
    return "1mb";
  }

  // localhost
  get certPathSelf() {
    return {
      pKeyPath: "./self-cert/privatekey.pem",
      pCertPath: "./self-cert/certificate.pem",
      pCBPath: "./self-cert/certificate.pem"
    };
  };

  // production
  get certPathProd() {
    return {
      pKeyPath: "/etc/letsencrypt/live/ko.maximumroulette.com/privkey.pem",
      pCertPath: "/etc/letsencrypt/live/ko.maximumroulette.com/cert.pem",
      pCBPath: "/etc/letsencrypt/live/ko.maximumroulette.com/fullchain.pem"
    };
  };

  /**
   * @description
   * Email Service
   */
  get systemEmail() {
    return {
      user: "**********@gmail.com",
      pass: "******************"
    };
  };

  get connectorPort() {
    return 80
  } 

      /**
     * @description Database name
     * @param databaseName
     * @param databaseRoot {
     *   dev => LocalHost usage
     *   prod => Public Domain with possible remote connection
     *   secured => Public Domain with no possible remote connection
     * }
     */ 
    
  get databaseName() {
    return  "rocket-1";
  }

  get getDatabaseRoot() {

    var databaseRoot = {
      dev: "mongodb://localhost:27017",
      prod: "mongodb://userAdmin:***@*.*.*.140:49326/admin",
      secured: "mongodb://userAdmin:***@*.*.*.140:49326/admin",
      freeService: "mongodb+srv://nikola:********@***.gcp.mongodb.net/rocket-1?retryWrites=true&w=majority"
    };

    if (this.serverMode == "dev") {
      return databaseRoot.dev;
    } else if (this.serverMode == "prod") {
      return databaseRoot.prod;
    } else if (this.serverMode == "secured") {
      return databaseRoot.secured;
    } else if (this.serverMode == "mongodb.net") {
      return databaseRoot.freeService;
    }
  }

  get getMasterServerKey() {
    return this.masterServerKey;
  }

  /**
   * @description Setters
   */
  set setNetworkDeepLog(newState) {
    this.networkDeepLogs = newState;
  }

  get getNetworkDeepLog() {
    return this.networkDeepLogs;
  }

}
module.exports = ServerConfig;
