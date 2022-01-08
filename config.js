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
    return false;
  }

  /**
   * @description 
   * If you want to use api host also for 
   * hosting any web folders contents.
   */
  get hostSpecialRoute() {
    return {
      active: true,
      route: "/var/www/html/",
      webAppName: "BarbarianRoadMashines",
      type: "Race Game",
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
      pKeyPath: "/etc/letsencrypt/live/maximumroulette.com/privkey.pem",
      pCertPath: "/etc/letsencrypt/live/maximumroulette.com/cert.pem",
      pCBPath: "/etc/letsencrypt/live/maximumroulette.com/fullchain.pem"
    };
  };

  /**
   * @description
   * Email Service
   */
  get systemEmail() {
    return {
      user: "greespiral@gmail.com",
      pass: "********"
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

    */
    var databaseRoot = {
      dev: "mongodb://localhost:27017",
      prod: "mongodb://userAdmin:*********@IPADDRESS:PORT/admin",
      secured: "mongodb://userAdmin:********@IPADDRESS:PORT/admin",
      freeService: "mongodb+srv://userAdmin:PUT_YOUR_PASSWORD@cluster0.piqav.mongodb.net/[YOUR DATABASE NAME]?retryWrites=true&w=majority"
    };

    if (this.serverMode == "dev") {
      return databaseRoot.dev;
    } else if (this.serverMode == "prod") {
      return databaseRoot.prod;
    } else if (this.serverMode == "secured") {
      return databaseRoot.secured;
    } else if (this.serverMode == "mongodb.net") {
      return databaseRoot.secured;
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
