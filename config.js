/**
 * @description Define backend staff here.
 * @param serverMode { `dev` or `prod` }
 * @param networkDeepLogs { Boolean }
 * @param connectorPort { number }
 */

class ServerConfig {

  constructor() {
  
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

    /**
     * @description
     * Email Service
     */
    this.systemEmail = {
      user: "greespiral@gmail.com",
      pass: "********",
    };
    /**
     * @description Database name
     * @param databaseName
     * @param databaseRoot {
     *   dev => LocalHost usage
     *   prod => Public Domain with possible remote connection
     *   secured => Public Domain with no possible remote connection
     * }
     */
    this.databaseName = "rocket-master-base1";

    this.databaseRoot = {
      dev: "mongodb://localhost:27017",
      prod: "mongodb://userAdmin:********@maximumroulette.com:27017/admin",
      secured: "mongodb://userAdmin:********localhost:27017/admin",
    };

    this.specialRoute = {
      default: "/var/www/html/applications/"
    };

    console.info(" --------------------------------------------");
    console.info(" -> Server running under " + this.serverMode + " configuration.");
    if (this.serverMode == "dev") {
      console.info(" -> domain dev:", this.domain.dev);
    } else if (this.serverMode == "prod") {
      console.info(" -> domain prod:", this.domain.prod);
    }
    console.info(" -> masterServerKey:", this.masterServerKey);
    console.info(" -> connectorPort:", this.connectorPort);
    console.info(" -> protocol:", this.protocol);
    console.info(" -> databaseName:", this.databaseName);
    console.info(" --------------------------------------------");
  }

  get getDatabaseRoot() {
    if (this.serverMode == "dev") {
      return this.databaseRoot.dev;
    } else if (this.serverMode == "prod") {
      return this.databaseRoot.prod;
    }
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
