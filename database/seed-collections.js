
let MongoClient = require("mongodb").MongoClient;
const shared = require("./../common/shared");
const Crypto = require("./../common/crypto");

/**
 * MyDatabase class
 * MongoDB Database used in this project
 * version 4.4.2
 * JavaScript fullstack project
 */
class SeedDatabaseCollections {

  seedIncrementalIndex() {
    return this.usersSeedIndex++;
  }

  emailConstructor() {
    return 'fake_user' + this.seedIncrementalIndex() + '@localhost.com'
  }

  constructor(serverConfig) {
    this.config = serverConfig;
    this.crypto = new Crypto();
    this.usersSeedIndex = 0;
    this.seedNumberOfUsers = 1000;
    this.mPassword = '12345678';
  }

  seedCollections() {
    const r1 = this.seedUsersCollection();
    return r1;
  }

  /**
   * Method register is called on singup user action.
   * @param {object} user
   *  email: user.userRegData.email
   *  user.userRegData.password
   * @param {classInstance} callerInstance
   */
  seedUsersCollection(numOfFakeUsers) {
    var root = this;
    this.seedNumberOfUsers = numOfFakeUsers;
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
          if (dbo.collection("users")) {

            console.info("MyDatabase seed new fake users.");
            var fakeUsers = [];

            for (var x = 0; x < root.seedNumberOfUsers;x++) {
              let uniqLocal = shared.generateToken(5);
              fakeUsers.push({
                  email: root.emailConstructor(),
                  password: root.crypto.encrypt(root.mPassword),
                  nickname: "no-nick-name" + shared.getDefaultNickName(),
                  confirmed: Math.random() < 0.5,
                  token: uniqLocal,
                  socketid: null,
                  online: false,
                  points: shared.getRandomIntFromTo(10,1000),
                  rank: "junior",
                  permission: "basic",
                  age: "any",
                  country: "any",
                  ban: false
              })
            }
              dbo.collection("users").insertMany(
              fakeUsers,
              function(err, res) {
                if (err) {
                  console.log("MyDatabase err[4]:" + err);
                  db.close();
                  return;
                }
                if (res) {
                  resolve("Collections users seeded.")
                }
                var responseFromDatabaseEngine = {
                  status: "USER_REGISTERED"
                };
                db.close();
              }
            )
          } else {
            resolve("Collections users already exist.")
            db.close();
          }

        });
    });
  }

}

module.exports = SeedDatabaseCollections;
