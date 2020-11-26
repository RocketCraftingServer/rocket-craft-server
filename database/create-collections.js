
let MongoClient = require("mongodb").MongoClient;
// const shared = require("./../common/shared");
// const fs = require("fs");

/**
 * MyDatabase class
 * MongoDB Database used in this project
 * version 4.4.2
 * JavaScript fullstack project
 */
class CreateDatabaseCollections {

  constructor(serverConfig) {
    this.config = serverConfig;
  }

  /**
   * Method register is called on singup user action.
   * @param {object} user
   *  email: user.userRegData.email
   *  user.userRegData.password
   * @param {classInstance} callerInstance
   */
  createCollections() {

    var root = this;
    const databaseName = this.config.databaseName;

    /**
     * @description 
     * Create `users` collections.
     */
    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (error, db) {
          if (error) {
            console.warn("MyDatabase  error:" + error);
            return;
          }
          const dbo = db.db(databaseName);
          if (!dbo.collection("users")) {
            dbo.createCollection("users").createIndex({ email: 1 }, { unique: true });
            dbo.createCollection("users").createIndex({ password: 1 }, { unique: true });
            dbo.createCollection("users").createIndex({ socketid: 1 }, { unique: true });
            dbo.createCollection("users").createIndex({ confirmed: 1 }, { unique: true });
            dbo.createCollection("users").createIndex({ token: 1 }, { unique: true });
            dbo.createCollection("users").createIndex({ online: 1 }, { unique: false });
            dbo.createCollection("users").createIndex({ nickname: 1 }, { unique: false });
            dbo.createCollection("users").createIndex({ points: 1 }, { unique: false });
            dbo.createCollection("users").createIndex({ profileUrl: 1 }, { unique: true });
            resolve("Collections users created.")
          } else {
            resolve("Collections users already exist.")
          }

        });
    });
  }
}

module.exports = CreateDatabaseCollections;
