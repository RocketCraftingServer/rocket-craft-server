let MongoClient = require("mongodb").MongoClient;
module.exports = { 

  getActiveList(user, dataOptions) {

    const databaseName = dataOptions.dbName;

    return new Promise((resolve) => {  
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) { 
          console.warn("Profile actions profile error :" + error);
          resolve({ status: 'error in MyDatabase getUsers'})
          return;
        }
        const dbo = db.db(databaseName);
        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
        }, {}, function(err, result) {
          if (err) { 
            console.warn("Profile actions profile error :" + err);
            resolve({ status: "WRONG DB QUERY" });
          }
          if (result !== null) {
            if (result.token) {
              console.warn("Session passed <BASIC> FIND ALL");

              dbo.collection("activegames").find({}, {}).toArray(function(err, aresult) {
                if (err) {
                  console.warn("Profile actions profile error :" + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {

                  if (aresult.length == 0) {

                    resolve({ 
                      status: "ACTIVE_LIST_PASSED_EMPTY",
                    });
                    
                  } else {
                    resolve({ 
                      status: "ACTIVE_LIST_PASSED",
                      activelist: aresult
                    });
                  }
                  
                } else {
                  var usersData = {
                    status: "ACTIVE_LIST_PASSED_EMPTY"
                  };
                  resolve(usersData);
                }
              })

            } else {
              resolve({ status: "WRONG_PASSWORD" });
            }
          }
        });
      })
    })
  },

  test() {
    console.info("Out of Space")
  },

  /**
   * @description Adding User game host information
   * to the active server list if not exist already.
   * @param {*} user 
   * @param {*} dataOptions 
   */  
  getProfileID(user, dataOptions) {

    const databaseName = dataOptions.dbName;
    
    return new Promise((resolve) => {  
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) { 
          console.warn("Profile actions profile error :" + error);
          resolve({ status: 'error in MyDatabase getUsers'})
          return;
        }
        const dbo = db.db(databaseName);
        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
        }, {}, function(err, result) {
          if (err) { 
            console.warn("Profile actions profile error :" + err);
            resolve({ status: "WRONG DB QUERY" });
          }
          if (result !== null) {
            if (result.token) {
              // console.warn("Session passed:" , user.myIp);
              user.myIp = user.myIp.replace("::ffff:", "")
              var usersData = {
                status: "ACTIVE_LIST_PASSED",
              };
              dbo.collection("activegames").find({}, {}).toArray(function(err, aresult) {
                if (err) { 
                  console.warn("Profile actions profile error:" + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {

                  var localCheck = true;

                  aresult.forEach((item => {

                    if (item.userNickname === result.nickname) {
                      console.log("ALREADY_IN_ACTIVE_LIST", item)
                      localCheck = false;
                    }

                  }));

                  if (localCheck === false) {
                    return resolve({ status: "ALREADY_IN_ACTIVE_LIST" });
                  }

                  console.log("No in active list , add in active list")
                  dbo.collection("activegames").insertOne({
                    gameDescription: "Hosted by " + result.nickname,
                    userid: result.nickname,
                    userNickname: result.nickname,
                    sessionMapName: user.mapName,
                    sessionHostIp: user.myIp,
                    sessionPlatform: 'unset'
                  }, function (test) {
                    console.log('Mashine added to server active list. GOOD.')
                    console.log(test)
                    resolve(usersData);
                  });
                }

              })

            } else {
              resolve({ status: "WRONG_PASS_ACTIVELIST" });
            }
          }
        });
      })
    })
  },

  updateProfilePoints(user, dataOptions) {

    const databaseName = dataOptions.dbName;

    return new Promise((resolve) => {  
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) { 
          console.warn("Profile actions profile error :" + error);
          resolve({ status: 'error in MyDatabase getUsers'})
          return;
        }
        const dbo = db.db(databaseName);
        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
        }, {}, function(err, result) {
          if (err) { 
            console.warn("Profile actions profile error :" + err);
            resolve({ status: "WRONG DB QUERY" });
          }
          if (result !== null) {
            if (result.token) {
              console.warn("Session passed <BASIC> w is myIp " , user.myIp);
              user.myIp = user.myIp.replace("::ffff:", "")
              var usersData = {
                status: "RESULT NULL",
              };
              var newResult = result.points + 10;
              dbo.collection("users").updateOne({ email: user.email }, { $set:  { points: newResult } }, function(err, aresult) {
                if (err) { 
                  console.warn("Profile actions pointplus10 error :" + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {
                  resolve({ status: "POINTS_ACTION_POINTPLUS", userPoints: newResult });
                  console.log("POINTS_ACTION_POINTPLUS")
                } else if (aresult == null) {
                  resolve(usersData);
                }
              })

            } else {
              resolve({ status: "WRONG_PASS_POINTPLUS" });
            }
          }
        });
      })
    })
  },

  getLeaderboard(user, dataOptions) {

    const databaseName = dataOptions.dbName;

    return new Promise((resolve) => {  
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) { 
          console.warn("getLeaderboardResponse error :" + error);
          resolve({ status: 'error in MyDatabase getLeaderboardResponse'})
          return;
        }
        const dbo = db.db(databaseName);
        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
        }, {}, function(err, result) {
          if (err) { 
            console.warn("getLeaderboardResponse error :" + err);
            resolve({ status: "WRONG DB QUERY" });
          }
          if (result !== null) {
            if (result.token) {
              console.warn("Session passed <BASIC> w is myIp " , user.myIp);
              user.myIp = user.myIp.replace("::ffff:", "")
              var usersData = {
                status: "RESULT NULL",
              };
              dbo.collection("users").find({ confirmed: true }, {}).toArray(function(err, aresult) { 
                if (err) { 
                  console.warn("Profile actions pointplus10 error :" + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {

                  var leaderboardHandleData = [];
                  aresult.forEach(function(item) {
                    leaderboardHandleData.push(
                      {
                        nickname: item.nickname,
                        points: item.points,
                        rank: item.rank
                      }
                    )
                  })

                  resolve({ status: "LEADERBOARD_DATA" , leaderboard: leaderboardHandleData });
                  console.log("LEADERBOARD_DATA")

                } else if (aresult == null) {
                  resolve(usersData);
                }
              })

            } else {
              resolve({ status: "WRONG_PASS_ACTIVELIST" });
            }
          }
        });
      })
    })

  },

  removeFromActiveList(user, dataOptions) {

    const databaseName = dataOptions.dbName;

    return new Promise((resolve) => {  
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) { 
          console.warn("Profile actions profile error :" + error);
          resolve({ status: 'error in MyDatabase getUsers'})
          return;
        }
        const dbo = db.db(databaseName);
        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
        }, {}, function(err, result) {
          if (err) { 
            console.warn("Profile actions profile error :" + err);
            resolve({ status: "WRONG DB QUERY" });
          }
          if (result !== null) {
            if (result.token) {
              console.warn("Session passed <BASIC> FIND ALL");

              dbo.collection("activegames").find({userNickname: result.nickname}, {}).toArray(function(err, aresult) {
                if (err) {
                  console.warn("Remove from server list actions error: " + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {
                  if (aresult.length == 0) {
                    resolve({ 
                      status: "NOT_IN_ACTIVE_SERVER_LIST",
                    });
                  } else {

                    dbo.collection("activegames").deleteOne({userNickname: result.nickname}, {}, function (err, oresult) {
                      if (err) {
                        console.warn("Remove from server list actions error: " + err);
                        resolve({ status: "WRONG DB QUERY IN REMOVE PROCEDURE." });
                      }

                      // console.log(" TEST ", oresult.deletedCount);
                      if (oresult.deletedCount == 1) {
                        resolve({
                          status: "REMOVE_FROM_ACTIVE_LIST_PASSED",
                          activelist: aresult
                        });
                      } else {
                        resolve({
                          status: "REMOVE_FROM_ACTIVE_LIST_PASSED",
                          errorStatus: "UNKNOW_ERROR",
                          activelist: aresult
                        });
                      }

                    });

                  }
                } else {
                  var usersData = {
                    status: "RESULT_NULL"
                  };
                  resolve(usersData);
                }
              })
            } else {
              resolve({ status: "WRONG_PASSWORD" });
            }
          }
        });
      })
    })
  },

}