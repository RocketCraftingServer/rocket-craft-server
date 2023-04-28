
let MongoClient = require("mongodb").MongoClient;
const {get} = require("http");
const shared = require("./../common/shared");
const fs = require("fs");
const {Console} = require("console");

/**
 * @description MyDatabase class
 * MongoDB Database used in this project
 * version 4.4.2
 * JavaScript/NODE.JS fullstack project
 */
class MyDatabase {

  constructor(serverConfig) {
    this.config = serverConfig;
    this.sizeOfUsers = 0;
  }

  async populateDatabase() {
    const CreateDatabaseCollections = require("./create-collections");
    var databasePopulate = new CreateDatabaseCollections(this.config);
    var r = await databasePopulate.createCollections();
    console.log("Database startup migrate -> ", r);
  }

  async seedDatabase(numOfFakeUsers) {
    const SeedDatabaseCollections = require("./seed-collections");
    var databasePopulate = new SeedDatabaseCollections(this.config);
    var r = await databasePopulate.seedUsersCollection(numOfFakeUsers);
    console.log("Database seed finished -> ", r);
  }

  async checkInitiallyDatabaseSize() {
    var t = await this.checkInitiallyDatabaseSizeInternal();
    this.sizeOfUsers = t;
    console.log("Database size => ", t);
  }

  checkInitiallyDatabaseSizeInternal() {
    const databaseName = this.config.databaseName;
    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot,
        {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("MyDatabase: err1:" + error);
            resolve("SOMETHING_WRONG_WITH_REGISTRATION");
            return;
          }
          const dbo = db.db(databaseName);
          var test = dbo.collection("users").countDocuments({})
          test.then((e) => {resolve(e)})
        })
    })
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
        {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("MyDatabase : err1:" + error);
            resolve("SOMETHING_WRONG_WITH_REGISTRATION")
            return;
          }

          const dbo = db.db(databaseName);
          dbo.collection("users").findOne({email: user.email}, function(err, result) {
            if(err) {
              console.warn("MyDatabase err in register:" + err);
              resolve("SOMETHING_WRONG_WITH_REGISTRATION");
              return null;
            }

            if(result === null) {
              let uniqLocal = shared.generateToken(6);
              console.info("MyDatabase Register new user...");
              dbo.collection("users").insertOne(
                {
                  email: user.email,
                  password: callerInstance.crypto.encrypt(user.password),
                  nickname: "no" + shared.getDefaultNickName(),
                  confirmed: false,
                  token: uniqLocal,
                  socketid: user.socketId,
                  online: false,
                  points: 1000,
                  rank: "junior",
                  permission: "basic",
                  age: "any",
                  country: "any",
                  ban: false
                },
                function(err, res) {
                  if(err) {console.log("MyDatabase err3:" + err); return;}
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
              var responseFromDatabaseEngine = {
                status: "USER_ALREADY_REGISTERED",
                email: user.email,
                token: null,
              }
              db.close();
              resolve(responseFromDatabaseEngine);
            }
          });
        }
      )
    });
  }

  regValidator(user) {

    const databaseName = this.config.databaseName;
    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(error, db) {
          if(error) {
            console.warn("MyDatabase error:" + error);
            resolve("SOMETHING_WRONG_MyDatabase_ACCESS");
            return;
          }

          const dbo = db.db(databaseName);
          console.log(">>>> user.token>>>>>> ", user.token)
          dbo.collection("users").findOne({email: user.email, token: user.token}, function(err, result) {
            if(err) {
              console.log("MyDatabase.regValidator 2:" + err);
              return null;
            }

            if(result !== null) {
              dbo
                .collection("users")
                .updateOne({email: user.email}, {$set: {confirmed: true, points: 100}}, function(err, result) {
                  if(err) {
                    console.info("MyDatabase, user confirmed err :" + err);
                    var local = {
                      result: null,
                      email: user.email
                    };
                    resolve(local);
                    return;
                  }
                  console.info("MyDatabase, user confirmed result:" + result);
                  var local = {
                    result: result,
                    email: user.email,
                    accessToken: user.token
                  };
                  resolve(local);
                });
            } else {
              // ? not tested
              console.warn("MyDatabase, update confirmed result ? not tested:" + result);
              // callerInstance.onRegValidationResponse(result, user.email, user.accessToken);
              var local = {
                result: result,
                email: user.email,
                accessToken: user.accessToken
              };
              resolve(local);
            }
          });
        }
      );
    });
  }

  loginUser(user, callerInstance) {

    const databaseName = this.config.databaseName;

    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(error, db) {
          if(error) {console.warn("MyDatabase.login error: " + error); return;}
          const dbo = db.db(databaseName);
          // console.warn("MyDatabase.login user => ", user);
          dbo.collection("users").findOne({email: user.email, confirmed: true}, {}, function(err, result) {
            if(err) {
              console.log("MyDatabase.login error: " + err);
              resolve("MyDatabase.login.error");
              return;
            }

            if(result !== null) {
              // Secure
              const pass = callerInstance.crypto.decrypt(result.password);
              if(pass == user.password) {
                console.warn("Session passed.");
              } else {
                // handle bad cert
                console.warn("login.bad.password");
                const userData = {
                  status: "WRONG_PASSWORD",
                }
                resolve(userData);
              }
              // Security staff
              const userData = {
                status: "USER_LOGGED",
                email: result.email,
                nickname: result.nickname,
                points: result.points,
                rank: result.rank,
                token: result.token,
                profileImage: result.profileUrl
              };

              dbo.collection("users").updateOne({email: user.email}, {$set: {online: true}}, function(err, result) {
                if(err) {
                  console.log("BAD_EMAIL_OR_PASSWORD");
                  resolve("BAD_UPDATE_EMAIL_OR_PASSWORD")
                  return;
                }
                console.warn("ONLINE: ", userData.nickname);
                resolve(userData);
              })
            } else {

            }
          })
        })
    })
  }

  getUserData(user) {
    const databaseName = this.config.databaseName;
    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(error, db) {
          if(error) {
            console.warn("MyDatabase.login :" + error);
            resolve("error");
            return;
          }

          const dbo = db.db(databaseName);
          dbo
            .collection("users")
            .findOne({permission: "basic", online: true, confirmed: true}, function(err, result) {
              if(err) {
                console.log("MyDatabase.getUserData :" + err);
                return null;
              }
              if(result !== null) {
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

                resolve(userData);
              } else {
                resolve("NONO");
              }
            });
        })
    })
  }

  setNewNickname(user) {

    const databaseName = this.config.databaseName;

    return new Promise((resolve) => {

      MongoClient.connect(
        this.config.getDatabaseRoot,
        {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("MyDatabase.login err: " + error);
            return;
          }
          const dbo = db.db(databaseName);
          dbo.collection("users")
            .findOne({email: user.email, online: true, confirmed: true, token: user.token},
              function(err, result) {
                if(err) {
                  console.log("MyDatabase.setNewNickname err: " + err);
                  return null;
                }
                if(result !== null) {
                  const userData = {
                    status: "NICKNAME_CHANGED"
                  };
                  dbo.collection("users").updateOne(
                    {email: user.email}, {$set: {nickname: user.newNickname}},
                    function(err, result2) {
                      if(err) {
                        console.log("MyDatabase.setNewNickname (error in update):", err);
                        resolve({status: "ERROR IN NEW NICK NAME"});
                        return;
                      }
                      resolve(userData);
                    });
                }
              });
        });
    })
  }

  fastLogin(user, callerInstance) {
    return new Promise((resolve) => {
      const databaseName = this.config.databaseName;
      MongoClient.connect(
        this.config.getDatabaseRoot,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        },
        function(error, db) {
          if(error) {console.warn("MyDatabase.login error:" + error); return;}
          const dbo = db.db(databaseName);
          dbo.collection("users").findOne(
            {email: user.email, token: user.token, confirmed: true}, function(err, result) {
              if(err) {console.log("MyDatabase.login :" + err); return null}
              if(result !== null) {
                // Security staff
                const userData = {
                  status: 'USER_LOGGED',
                  email: result.email,
                  nickname: result.nickname,
                  points: result.points,
                  rank: result.rank,
                  token: result.token,
                  profileImage: result.profileUrl
                };

                dbo.collection("users")
                  .updateOne({email: result.email}, {$set: {online: true}}, function(err, result) {
                    if(err) {console.log("BAD_EMAIL_OR_PASSWORD"); return;}
                    console.warn("online: ", userData.nickname);
                    resolve(userData);
                  });
              }
            });
        }
      )
    })
  }

  logOut(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(error, db) {
        if(error) {
          console.warn("MyDatabase.login error:" + error);
          return;
        }

        const dbo = db.db(databaseName);

        dbo.collection("users").findOne({token: user.data.token, confirmed: true}, function(err, result) {
          if(err) {
            console.log("MyDatabase.logout :" + err);
            return null;
          }

          if(result !== null) {
            // Security staff
            const userData = {
              email: result.email,
              nickname: result.nickname,
              points: result.points,
              rank: result.rank,
              token: result.token
            };

            dbo.collection("users").updateOne({email: userData.email}, {$set: {online: false}}, function(err, result) {
              if(err) {
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

  forgotPass(user, callerInstance) {
    console.log(">>>> uiser", user)
    return new Promise((resolve) => {
      const databaseName = this.config.databaseName;
      MongoClient.connect(this.config.getDatabaseRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {console.warn("MyDatabase.forgotPassword.err1:" + error); return;}
          const dbo = db.db(databaseName);
          dbo.collection("users").findOne({email: user.email}, function(err, result) {
            if(err) {console.log("MyDatabase.forgotPassword => " + err); return null;}
            if(result !== null) {
              var FTOKEN = shared.generateToken(5);
              dbo
                .collection("users")
                .updateOne({email: user.email}, {$set: {ftoken: FTOKEN}}, {multi: true}, function(err, r1) {
                  if(err) {console.warn("MyDatabase.FTOKEN err2 => " + err); return;}
                  if(r1 != null) {
                    console.warn("MyDatabase UPDATE FTOKEN. r1.nModified  " + r1.nModified);
                    resolve({status: "FTOKEN CREATED", email: user.email, ftoken: FTOKEN});
                    db.close();
                  }
                  else {
                    resolve({status: "FTOKEN-FAIL1"});
                    db.close();
                  }
                });
            } else {
              resolve({status: "FTOKEN-FAIL2"});
              console.log("There is no registred email. leave it with no server action.");
              db.close();
            }
          });
        });
    });
  }

  setNewPass(user, callerInstance) {
    console.log(">>>> uiser VVVVV ", user)
    return new Promise((resolve) => {
      const databaseName = this.config.databaseName;
      MongoClient.connect(this.config.getDatabaseRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {console.warn("MyDatabase.forgotPassword.err1:" + error); return;}
          const dbo = db.db(databaseName);
          dbo.collection("users").findOne({email: user.email, ftoken: user.ftoken}, function(err, result) {
            if(err) {console.log("MyDatabase.setnewpass => " + err); return null;}
            if(result !== null) {
              var FTOKEN = shared.generateToken(5);
              dbo
                .collection("users")
                .updateOne({email: user.email}, {$set: {password: callerInstance.crypto.encrypt(user.newPassword)}}, function(err, r1) {
                  if(err) {console.warn("MyDatabase.setNewPassword err => " + err); return;}
                  if(r1 != null) {
                    console.log("NICE NICE r1.nModified  ", r1.nModified);
                    resolve({status: "NEW-PASS-DONE"})
                  } else {
                    console.log("Waooo.");
                    resolve({status: "NEWPASS-FAIL4"});
                  }
                });
            } else {
              resolve({status: "NEWPASS-FAIL3"});
              console.log("Waooo.");
              db.close();
            }
          });
        });
    });
  }

  // UPGRADE
  getUsersList(user) {
    const databaseName = this.config.databaseName;
    return new Promise((resolve) => {
      MongoClient.connect(
        this.config.getDatabaseRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("MyDatabase.getUsersList :" + error);
            resolve({status: 'error in MyDatabase getUsers'})
            return;
          }
          const dbo = db.db(databaseName);
          dbo.collection("users").findOne({token: user.token, confirmed: true, online: true}, {}, function(err, result) {
            if(err) {
              console.log("MyDatabase.login error: " + err);
              resolve("MyDatabase.login.error");
            }
            if(result !== null) {
              // Secure const pass = callerInstance.crypto.decrypt(result.password);
              if(user.token) {
                // console.info("Session passed.");
                var coll = dbo.collection("users");
                var skipValue = 0;
                var limitValue = 500;
                //  resolve({ status: "WRONG_" }); NEED FIX
                if(user.criterium.description == 'list-all') {
                  // 
                  if(user.criterium.moreExploreUsers == 1) {
                    skipValue += limitValue;
                  }
                  console.log("Good ")
                }
                coll.find().skip(skipValue).limit(limitValue).toArray(function(err, result) {

                  if(err) {
                    console.log("error in get user list.");
                    resolve({status: 'error in getUsers'})
                  } else {

                    var usersData = {
                      status: "AUTHORIZED",
                      users: []
                    };
                    result.forEach(function(item, index) {
                      var reduceName = "users-shared-data/no-image.jpg";
                      if(typeof item.profileUrl !== 'undefined') {
                        reduceName = item.profileUrl.replace("public", "");
                      }
                      var user = {};
                      user.id = item._id;
                      user.nickname = item.nickname;
                      user.points = item.points;
                      user.rank = item.rank;
                      user.online = item.online;
                      user.email = item.email;
                      user.confirmed = item.confirmed;
                      user.profileImage = reduceName;
                      usersData.users.push(user);
                    });
                    resolve(usersData);
                  }
                });

              } else {
                resolve({status: "WRONG_PASSWORD"});
              }
            } else {
              console.warn("RESULT NULL");
              resolve("MyDatabase.no.results");
              db.close();
            }
          });
        })
    })
  }

  // UPGRADE
  tryUser(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(error, db) {
        if(error) {
          console.warn("MyDatabase.tryUser :" + error);
          return;
        }

        const dbo = db.db(databaseName);
        var coll = dbo.collection("users");

        coll.findOne({confirmed: true, nickname: user.data.tryThisUser}, function(err, result) {
          if(err) {
            console.log("MyDatabase.tryUser:" + err);
            return null;
          }

          if(result !== null) {
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

  // UPGRADE - FUTURE - WEBRTC
  callRejectUser(user, callerInstance) {
    const databaseName = this.config.databaseName;
    MongoClient.connect(
      this.config.getDatabaseRoot,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      function(error, db) {
        if(error) {
          console.warn("MyDatabase.tryUser :" + error);
          return;
        }

        const dbo = db.db(databaseName);
        var coll = dbo.collection("users");

        coll.findOne({confirmed: true, nickname: user.data.rejectThisUser}, function(err, result) {
          if(err) {
            console.log("MyDatabase.logout :" + err);
            return null;
          }

          if(result !== null) {
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
  saveProfileImageAddress(user) {
    return new Promise((resolve, reject) => {
      const databaseName = this.config.databaseName;
      const storagePath = this.config.storageDir;
      MongoClient.connect(this.config.getDatabaseRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        (error, db) => {
          if(error) {reject("MyDatabase.saveProfileImageAddress error:" + error); return;}
          const dbo = db.db(databaseName);
          dbo.collection("users")
            .findOne({token: user.token, online: true, confirmed: true}, (err, result) => {
              if(err) {
                resolve({
                  status: 'BAD',
                  message: 'MyDatabase saveProfileImageAddress err'
                }); return null;
              }
              if(result !== null) {
                // console.log('storagePath', storagePath)
                // delete old image
                var oldUserFolder = storagePath;
                var test = result.profileUrl;
                var getOnlyFolder = test.replace('profile.png', '');
                var oldFullPAth = oldUserFolder + getOnlyFolder;
                if(fs.existsSync(oldFullPAth)) {
                  fs.rmSync(oldFullPAth, {recursive: true, force: true});
                }
                var userFolder = storagePath;
                if(!fs.existsSync(userFolder)) {
                  fs.mkdirSync(userFolder)
                }
                if(!fs.existsSync(userFolder)) {
                  fs.mkdirSync(userFolder)
                }
                userFolder += '/' + shared.generateToken(10);
                if(!fs.existsSync(userFolder)) {
                  fs.mkdirSync(userFolder)
                }
                var generatedPathProfileImage = userFolder + "/profile.png";
                var base64Data = "";
                if(user.photo == null) {
                  resolve({
                    status: 'BAD',
                    message: 'NO PHOTO BASE64'
                  })
                  return;
                }
                if(user.photo.indexOf("jpeg;base64") !== -1) {
                  base64Data = user.photo.replace(/^data:image\/jpeg;base64,/, "");
                } else if(user.photo.indexOf("png;base64") !== -1) {
                  base64Data = user.photo.replace(/^data:image\/png;base64,/, "");
                } else {
                  resolve({
                    status: 'BAD',
                    message: 'NO PHOTO BASE64'
                  })
                  return;
                }

                fs.writeFile(generatedPathProfileImage, base64Data, "base64", function(err) {
                  if(err) throw err;
                  console.log("[async] Photo profile saved.");
                });

                let aliasAvatarPath = generatedPathProfileImage.split('storage')[1];
                dbo.collection("users")
                  .updateOne(
                    {token: user.token},
                    {$set: {"profileUrl": aliasAvatarPath}},
                    function(err, result2) {
                      if(err) {
                        resolve({
                          status: 'BAD',
                          message: 'NO PHOTO BASE64'
                        }); return;
                      }
                      resolve({
                        status: 'AVATAR_PASSED',
                        result: result2,
                        avatarPath: aliasAvatarPath
                      })
                    });
              }
            });
        });

    });
  }
}

module.exports = MyDatabase;
