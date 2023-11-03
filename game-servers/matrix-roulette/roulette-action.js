let MongoClient = require("mongodb").MongoClient;

module.exports = {
  getRouletteResults(user, dataOptions) {
    const databaseName = dataOptions.dbName;
    return new Promise((resolve) => {
      var root = this;
      MongoClient.connect(dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
        function(error, db) {
          if(error) {resolve({status: 'error in MyDatabase getUsers'}); return;}
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
              return;
            }
            if(result !== null) {
              if(result.token) {
                console.warn("Session passed <BASIC>");

                var user1 = {};

                var usersData = {
                  status: "AUTHORIZED",
                  user: user1
                };
                resolve(usersData);
                db.close();
              } else {
                resolve({status: "WRONG_PASSWORD"});
                db.close();
              }
            } else {
              db.close();
            }
          });
        })
    })
  }
}
