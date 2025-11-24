let MongoClient = require("mongodb").MongoClient;
module.exports = {

  getGameLogs(user, dataOptions) {
    const databaseName = dataOptions.dbName;
    return new Promise((resolve) => {
      var root = this;
      MongoClient.connect(
        dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("Profile actions profile error :" + error);
            resolve({status: 'error in MyDatabase getUsers'})
            return;
          }
          const dbo = db.db(databaseName);
          dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email
          }, {}, function(err, result) {
            if(err) {
              console.warn("Profile actions profile error :" + err);
              resolve({status: "WRONG DB QUERY"});
            }
            if(result !== null) {
              if(result.token) {
                console.warn("Session passed <BASIC> FIND ALL");

                dbo.collection("activegames").find({}, {}).toArray(function(err, aresult) {
                  if(err) {
                    console.warn("Profile actions profile error :" + err);
                    resolve({status: "WRONG DB QUERY"});
                  }
                  if(aresult !== null) {
                    if(aresult.length == 0) {
                      db.close();
                      resolve({
                        status: "ACTIVE_LIST_PASSED_EMPTY",
                      });
                    } else {
                      db.close();
                      resolve({
                        status: "ACTIVE_LIST_PASSED",
                        activelist: aresult
                      });
                    }

                  } else {
                    var usersData = {
                      status: "ACTIVE_LIST_PASSED_EMPTY"
                    };
                    db.close();
                    resolve(usersData);
                  }
                })

              } else {
                db.close();
                resolve({status: "WRONG_PASSWORD"});
              }
            }
          });
        })
    })
  },

  gameplayStarted() {
    const databaseName = dataOptions.dbName;
    return new Promise((resolve) => {
      var root = this;
      MongoClient.connect(
        dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {
            console.warn("Profile actions profile error :" + error);
            resolve({status: 'error in MyDatabase getUsers'})
            return;
          }
          const dbo = db.db(databaseName);
          dbo.collection("activegames").insertOne({
            gameDescription: "Hosted by " + result.nickname,
            userid: "nickname",
            userNickname: "nickname",
            sessionMapName: "nickname",
            gameName: "nickname",
            gameHostAlias: "nickname"
          }, function(test) {
            console.log('GAMEPLAY START added to server active list. GOOD.')
            console.log(test)
            resolve("OK");
            db.close();
          });
        })
    })
  }

}