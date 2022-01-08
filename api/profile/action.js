let MongoClient = require("mongodb").MongoClient;
module.exports = {

  getUserProfile(user, dataOptions) {

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
              console.warn("Session passed <BASIC>");
              var reduceName = "users-shared-data/no-image.jpg";
              if (typeof result.profileUrl !== 'undefined') {
                reduceName = result.profileUrl.replace("public", "");
              }
              var user = {};
              user.id = result._id;
              user.nickname = result.nickname;
              user.points = result.points;
              user.rank = result.rank;
              user.online = result.online;
              user.email = result.email;
              user.confirmed = result.confirmed;
              user.profileImage = reduceName;

              var usersData = {
                status: "AUTHORIZED",
                user: user 
              };
              resolve(usersData);

            } else {
              resolve({ status: "WRONG_PASSWORD" });
            }
          }
        });
      })
    })
  }

}
