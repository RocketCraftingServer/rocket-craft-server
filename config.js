class ServerConfig {
  constructor() {
    /**
     * Define backend staff
     */

    // enum : 'dev' or 'prod'
    this.serverMode = "dev";

    this.networkDeepLogs = false;
    this.connectorPort = 30100;

    this.domain = {
      dev: "localhost",
      prod: "maximumroulette.com"
    };

    this.masterServerKey = "rocket-server-app-database";
    this.protocol = "http";

    // localhost
    this.certPathSelf = {
      pKeyPath: "./self-cert/privatekey.pem",
      pCertPath: "./self-cert/certificate.pem",
      pCBPath: "./self-cert/certificate.pem"
    };

    // production
    this.certPathProd = {
      pKeyPath: "/etc/httpd/conf/ssl/maximumroulette.com.key",
      pCertPath: "/etc/httpd/conf/ssl/maximumroulette_com.crt",
      pCBPath: "/etc/httpd/conf/ssl/maximumroulette.ca-bundle"
    };

    this.appUseAccountsSystem = true;
    this.databaseName = "rocket-master-base1";

    this.databaseRoot = {
      dev: "mongodb://localhost:27017",
      prod: "mongodb://userAdmin:********@localhost:27017/admin"
    };

    this.specialRoute = {
      default: "/var/www/html/applications/"
    };

    // this.dataServeRoutes = ["../data-serve/platformer/class/activeplayers"];

    console.log("Server running under configuration => ", this.serverMode);

    if (this.serverMode == "dev") {
      console.log("-rtc domain dev", this.domain.dev);
    } else if (this.serverMode == "prod") {
      console.log("-rtc domain prod", this.domain.prod);
    }

    console.log("-rtc masterServerKey", this.masterServerKey);
    console.log("-rtc connectorPort", this.connectorPort);
    console.log("-rtc protocol", this.protocol);
    console.log("-rtc appUseAccountsSystem", this.appUseAccountsSystem);
    console.log("-rtc databaseName", this.databaseName);
  }

  get getDatabaseRoot() {
    if (this.serverMode == "dev") {
      return this.databaseRoot.dev;
    } else if (this.serverMode == "prod") {
      return this.databaseRoot.prod;
    }
  }

  get IsDatabaseActive() {
    return this.appUseAccountsSystem;
  }

  set setNetworkDeepLog(newState) {
    this.networkDeepLogs = newState;
  }

  get getNetworkDeepLog() {
    return this.networkDeepLogs;
  }

  get getMasterServerKey() {
    return this.masterServerKey;
  }

}
module.exports = ServerConfig;
