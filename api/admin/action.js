let Mongo = require("mongodb")
let MongoClient = require("mongodb").MongoClient

module.exports = {

  deleteUserProfile(user, dataOptions) {

    const databaseName = dataOptions.dbName;

    return new Promise((resolve) => {
      var root = this;
      MongoClient.connect(
       dataOptions.dbRoot, { useNewUrlParser: true, useUnifiedTopology: true },
       function(error, db) {
        if (error) {console.warn("Profile actions profile error :" + error);
          resolve({ status: 'error in MyDatabase getUsers'}); return; }
        const dbo = db.db(databaseName);

        console.log("DELETE USER user " , user)

        dbo.collection("users").findOne({
            token: user.token,
            confirmed: true,
            online: true,
            email: user.email,
            permission: "admin"
        }, {}, function(err, result) {
          if (err) {console.warn("Profile actions profile error :" + err); resolve({ status: "WRONG DB QUERY LEVEL 1" }); }
          if (result !== null) {
            if (result.token) {
              console.warn("Session passed <ADMIN> deleteUserId ", user.deleteUserId);

              var userAdmin = {};
              userAdmin.id = result._id;
              userAdmin.permission = result.permission;
              var usersData = {
                status: "AUTHORIZED",
                user: userAdmin
              };

              // OK  findOne({confirmed: true, _id: new Mongo.ObjectID(user.data.tryThisUser)}
              dbo.collection("users").removeOne({_id: new Mongo.ObjectID(user.deleteUserId)}, {} , (err, r2)=>{
                if (err) {console.warn("Profile actions profile error :" + err); resolve({ status: "WRONG DB QUERY LEVEL 2" }); }
                if (r2 !== null) {
                  // console.log("REMOVED !!!", r2)
                  resolve(usersData);
                }
              });

            } else {
              resolve({ status: "WRONG_PASSWORD" });
            }

          }
        });
      })
    })
  }

}
