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
                      status: "DB_QUERY_ACTIVE_LIST_PASSED",
                      activelist: aresult
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

  test() {
    console.log("Nikola Lukic")
  },

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
              console.warn("Session passed <BASIC> w is myIp " , user.myIp);
              user.myIp = user.myIp.replace("::ffff:", "")
              var usersData = {
                status: "ACTIVE_LIST_PASSED",
              };
              dbo.collection("activegames").findOne({
              }, {}, function(err, aresult) {
                if (err) { 
                  console.warn("Profile actions profile error :" + err);
                  resolve({ status: "WRONG DB QUERY" });
                }
                if (aresult !== null) {
                  resolve({ status: "ALREADY_IN_ACTIVE_LIST" });
                  console.log("ALREADY_IN_ACTIVE_LIST")
                } else if (aresult == null) {

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
  }

}