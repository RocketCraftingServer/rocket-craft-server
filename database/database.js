
let MongoClient = require("mongodb").MongoClient;
const shared = require("./../common/shared");
const fs = require("fs");

/**
 * MyDatabase class
 * MongoDB Database used in this project
 * version 4.4.2
 * JavaScript fullstack project
 */
class MyDatabase {

  constructor(serverConfig) {
    this.config = serverConfig;
  }

  async populateDatabase() {
    const CreateDatabaseCollections = require("./create-collections")
    var databasePopulate = new CreateDatabaseCollections(this.config);
    var r = await databasePopulate.createCollections();
    console.log("Database startup migrate -> ", r);
  }

  /**
   * Method register is called on singup user action.
   * @param {object} user
   *  email: user.userRegData.email
   *  user.userRegData.password
   * @param {classInstance} callerInstance
   */
  register(user, callerInstance) {
    /**
     * @description 
     * This line prevents method register
     * to be used by others classes.
     * ResponseHandler class is allowed.
     */
    /*
    if (callerInstance.constructor.name !== "RocketRoute") {
      console.error("callerInstance must be registred in database.js");
      return;
    }
    */

    const databaseName = this.config.databaseName;

    /**
     * Open connection with database.
     */
    return new Promise((resolve) => {  
      MongoClient.connect(
        this.config.getDatabaseRoot,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(error, db) {
          if (error) {
            console.warn("MyDatabase : err1:" + error);
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
          }

          dbo.collection("users").findOne({ email: user.email }, function(err, result) {
            if (err) {
              console.warn("MyDatabase err in register:" + err);
              resolve("SOMETHING_WRONG_WITH_REGISTRATION")
              return null;
            }

            if (result === null) {
              let uniqLocal = shared.generateToken();
              console.info("MyDatabase Register new user...");
              dbo.collection("users").insertOne(
                {
                  email: user.email,
                  password: callerInstance.crypto.encrypt(user.password),
                  nickname: "no-nick-name" + shared.getDefaultNickName(),
                  confirmed: false,
                  token: uniqLocal,
                  socketid: user.socketId,
                  online: false,
                  points: 1000,
                  rank: "junior"
                },
                function(err, res) {
                  if (err) {
                    console.log("MyDatabase err3:" + err);
                    db.close();
                    return;
                  }
                  var responseFromDatabaseEngine = {
                    status: "USER_REGISTERED",
                    email: res.ops[0].email,
                    token: res.ops[0].token,
                    socketid: res.ops[0].socketid,
                  };
                  db.close();
                  resolve(responseFromDatabaseEngine);
                }
              );
            } else {
              var responseFromDatabaseEngine = [
                "USER_ALREADY_REGISTERED",
                user.email,
                null,
              ]
              db.close();
              resolve(responseFromDatabaseEngine);
            }
          });
        }
    ) });
  }

  regValidator(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase : err1:" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo.collection("users").findOne({ email: user.email, token: user.token }, function(err, result) {
          if (err) {
            console.log("MyDatabase.regValidator 2:" + err);
            return null;
          }

          if (result !== null) {
            dbo
              .collection("users")
              .updateOne({ email: user.email }, { $set: { confirmed: true, points: 100 } }, function(err, result) {
                if (err) {
                  console.warn("MyDatabase, update confirmed err :" + err);
                  callerInstance.onRegValidationResponse(null, user.email, user.accessToken);
                  return;
                }
                console.warn("MyDatabase, update confirmed result:" + result);
                callerInstance.onRegValidationResponse(result, user.email, user.accessToken);
              });
          } else {
            callerInstance.onRegValidationResponse(result, user.email, user.accessToken);
          }
        });
      }
    );
  }

  loginUser(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login error:" + error);
          return;
        }

        const dbo = db.db(databaseName);

        console.warn("MyDatabase.login log ...user ", user);

        dbo.collection("users").findOne({ email: user.email, confirmed: true }, {}, function(err, result) {
          if (err) {
            console.log("MyDatabase.login :" + err);
            return null;
          }

          console.warn("MyDatabase.login log ...result ", result);

          if (result !== null) {
            // "password.iv" : password.iv, "password.encryptedData": password.encryptedData
            // Secure
            const pass = callerInstance.crypto.decrypt(result.password);
            if (pass != user.password) {
              console.warn("Session passed...");
            } else {
              // handle bad cert
              console.warn("Session : Bad cert");
            }
            // Security staff
            const userData = {
              email: result.email,
              nickname: result.nickname,
              points: result.points,
              rank: result.rank,
              token: result.token,
              profileImage: result.profileUrl
            };

            dbo.collection("users").updateOne({ email: user.email }, { $set: { online: true } }, function(err, result) {
              if (err) {
                console.log("BAD_EMAIL_OR_PASSWORD");
                return;
              }
              console.warn("ONLINE: ", userData.nickname);
              callerInstance.onUserLogin(userData, callerInstance);
            });
          }
        });
      }
    );
  }

  getUserData(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login :" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo
          .collection("users")
          .findOne({ socketid: user.data.accessToken, online: true, confirmed: true }, function(err, result) {
            if (err) {
              console.log("MyDatabase.getUserData :" + err);
              return null;
            }

            if (result !== null) {
              // Security staff
              const userData = {
                email: result.email,
                points: result.points,
                rank: result.rank,
                nickname: result.nickname,
                socketid: result.accessToken,
                token: result.token,
                profileImage: result.profileUrl
              };

              callerInstance.onUserData(userData, callerInstance);
            }
          });
      }
    );
  }

  setNewNickname(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true},
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login :" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo
          .collection("users")
          .findOne({ socketid: user.data.accessToken, online: true, confirmed: true }, function(err, result) {
            if (err) {
              console.log("MyDatabase.setNewNickname (user socket id not found):" + err);
              return null;
            }

            if (result !== null) {
              const userData = {
                accessToken: user.data.accessToken,
                newNickname: user.data.newNickname,
                email: user.data.email
              };

              dbo
                .collection("users")
                .updateOne({ email: user.data.email }, { $set: { nickname: user.data.newNickname } }, function(err, result2) {
                  if (err) {
                    console.log("MyDatabase.setNewNickname (error in update):", err);
                    return;
                  }
                  callerInstance.onUserNewNickname(userData, callerInstance);
                });
            }
          });
      }
    );
  }

  fastLogin(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login error:" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo
          .collection("users")
          .findOne({ email: user.data.userLoginData.email, token: user.data.userLoginData.token, confirmed: true }, function(
            err,
            result
          ) {
            if (err) {
              console.log("MyDatabase.login :" + err);
              return null;
            }

            if (result !== null) {
              // Security staff
              const userData = {
                email: result.email,
                nickname: result.nickname,
                points: result.points,
                rank: result.rank,
                token: result.token,
                profileImage: result.profileUrl
              };

              dbo
                .collection("users")
                .updateOne({ email: user.data.userLoginData.email }, { $set: { online: true } }, function(err, result) {
                  if (err) {
                    console.log("BAD_EMAIL_OR_PASSWORD");
                    return;
                  }
                  console.warn("online: ", userData.nickname);
                  callerInstance.onUserLogin(userData, callerInstance);
                });
            }
          });
      }
    );
  }

  logOut(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login error:" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo.collection("users").findOne({ token: user.data.token, confirmed: true }, function(err, result) {
          if (err) {
            console.log("MyDatabase.logout :" + err);
            return null;
          }

          if (result !== null) {
            // Security staff
            const userData = {
              email: result.email,
              nickname: result.nickname,
              points: result.points,
              rank: result.rank,
              token: result.token
            };

            dbo.collection("users").updateOne({ email: userData.email }, { $set: { online: false } }, function(err, result) {
              if (err) {
                console.log("warn: logout bad access!");
                return;
              }
              console.warn("logout: ", userData.nickname);
              callerInstance.onLogOutResponse(userData, callerInstance);
            });
          }
        });
      }
    );
  }

  // UPGRADE
  getUsersList(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true},
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.getUsersList :" + error);
          return;
        }

        const dbo = db.db(databaseName);
        var coll = dbo.collection("users");

        coll.find({ confirmed: true }).toArray(function(err, result) {

          if (err) {
            console.log("error in get user list.");
          } else {

            var usersData = {};
            result.forEach(function(item, index) {

              var reduceName = "users-shared-data/no-image.jpg";
              if (typeof item.profileUrl !== 'undefined') {
                reduceName = item.profileUrl.replace("public", "");
              }
              // var reduceName = item.profileUrl.replace("public", "");
              // console.log("Append structure", index);
              // `['user' + index]` local - not important like property
              usersData["user" + index] = {};
              usersData["user" + index].nickname = item.nickname;
              usersData["user" + index].points = item.points;
              usersData["user" + index].rank = item.rank;
              usersData["user" + index].online = item.online;
              usersData["user" + index].profileImage = reduceName;
            });

            callerInstance.onSteamPublicUsers(user, callerInstance, usersData);
          }
        });
      }
    );
  }

  // UPGRADE
  tryUser(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true},
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.tryUser :" + error);
          return;
        }

        const dbo = db.db(databaseName);
        var coll = dbo.collection("users");

        coll.findOne({ confirmed: true, nickname: user.data.tryThisUser }, function(err, result) {
          if (err) {
            console.log("MyDatabase.tryUser:" + err);
            return null;
          }

          if (result !== null) {
            // Security staff
            // Private policy if you call someone you must expose email address
            // ovsessiontoken  user.data.ovsessiontoken
            // console.log("MyDatabase.tryUser result :", result);
            var userData = {
              accessToken: result.socketid,
              nickname: result.nickname,
              connectTo: user.data.ovsessiontoken,
              fromUser: user.data.fromUser
            };
            callerInstance.onTryUserCallByNickname(userData, callerInstance);
          } else {
            console.log("MyDatabase.tryUser: result null.");
          }
        });
      }
    );
  }

  // UPGRADE
  callRejectUser(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.tryUser :" + error);
          return;
        }

        const dbo = db.db(databaseName);
        var coll = dbo.collection("users");

        coll.findOne({ confirmed: true, nickname: user.data.rejectThisUser }, function(err, result) {
          if (err) {
            console.log("MyDatabase.logout :" + err);
            return null;
          }

          if (result !== null) {
            // Security staff
            // Private policy if you call someone you must expose email address
            // console.log(">>>>>>>>>>>>>>>>>>>  user.data.rejected access need :", user.data);
            // console.log("MyDatabase.tryUser result :", result);
            var userData = {
              accessToken: result.socketid,
              rejectedBy: user.data.rejectedBy
            };
            callerInstance.onCallRejected(userData, callerInstance);
          } else {
            console.log("MyDatabase.tryUser : result null");
          }
        });
      }
    );
  }

  // UPGRADE
  saveProfileImageAddress(user, callerInstance) {
    // console.log("MyDatabase.saveProfileImageAddress user.data: ", user.data);
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      { useNewUrlParser: true,
        useUnifiedTopology: true },
      function(error, db) {
        if (error) {
          console.warn("MyDatabase.login error:" + error);
          return;
        }
        const dbo = db.db(databaseName);
        dbo
          .collection("users")
          .findOne({ socketid: user.data.accessToken, online: true, confirmed: true }, function(err, result) {
            if (err) {
              console.log("MyDatabase.setNewNickname (user not found by accessToken):" + err);
              return null;
            }

            if (result !== null) {

              const userData = {
                accessToken: user.data.accessToken
              };

              var userFolder = "public/users-shared-data/";
              if (!fs.existsSync(userFolder)) {
                fs.mkdirSync(userFolder);
              }
              userFolder += result.token;
              if (!fs.existsSync(userFolder)) {
                fs.mkdirSync(userFolder);
              }

              var generatedPathProfileImage = userFolder + "/profileImage.png";
              var base64Data = "";

              if (user.data.photo.indexOf("jpeg;base64") !== -1) {
                base64Data = user.data.photo.replace(/^data:image\/jpeg;base64,/, "");
              } else if (user.data.photo.indexOf("png;base64") !== -1) {
                base64Data = user.data.photo.replace(/^data:image\/png;base64,/, "");
              } else {
                console.log("MyDatabase.saveProfileImageAddress ERROR with photo data.");
                return;
              }

              fs.writeFile(generatedPathProfileImage, base64Data, "base64", function(err) {
                if (err) throw err;
                // file has been written to disk
                console.log("Photo profile saved.");
              });

              // console.log("user.data.accessToken: ", user.data.accessToken);

              dbo
                .collection("users")
                .updateOne(
                  { socketid: user.data.accessToken },
                  { $set: { "profileUrl": generatedPathProfileImage } },
                  function(err, result2) {
                    if (err) {
                      console.log("MyDatabase.saveProfileImageAddress (error in update profileUrl field):", err);
                      return;
                    }
                    var userData = {
                      profilePhotoAdded: "Profile photo added.",
                      accessToken: user.data.accessToken
                    };
                    // console.log("result2: ", result2);
                    callerInstance.onUserNewProfileImage(userData, callerInstance);
                  }
                );
            }
          });
      }
    );
  }
}
module.exports = MyDatabase;
