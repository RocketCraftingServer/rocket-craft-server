class ServerConfig {
  constructor() {
    /**
     * Define backend staff here
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

    console.log(" <--------------------------------------------");
    console.log(" -> Server running under " + this.serverMode + " configuration.");
    if (this.serverMode == "dev") {
      console.log(" -> domain dev:", this.domain.dev);
    } else if (this.serverMode == "prod") {
      console.log(" -> domain prod:", this.domain.prod);
    }

    console.log(" -> masterServerKey:", this.masterServerKey);
    console.log(" -> connectorPort:", this.connectorPort);
    console.log(" -> protocol:", this.protocol);
    console.log(" -> appUseAccountsSystem:", this.appUseAccountsSystem);
    console.log(" -> databaseName:", this.databaseName);
    console.log(" <--------------------------------------------");
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
