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

  gameplayStarted(user, dataOptions) {
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
          const now = new Date();
          let currTime = now.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            });
          dbo.collection("forestofhollowblood").insertOne({
            gameDescription: "Started by " + user.username,
            userid: "nickname",
            userNickname: user.username,
            sessionMapName: "main map",
            gameName: "Forrest of hollow blood",
            time: currTime
          }, function() {
            console.log('GAMEPLAY START added to server active list. GOOD.')
            resolve({status: "OK", currTime: currTime});
            db.close();
          });
        })
    })
  }

}