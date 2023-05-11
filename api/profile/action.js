let MongoClient = require("mongodb").MongoClient;
module.exports = {

  getUserProfile(user, dataOptions) {

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
              return;
            }
            if(result !== null) {
              if(result.token) {
                console.warn("Session passed <BASIC>");
                var reduceName = "users-shared-data/no-image.jpg";
                if(typeof result.profileUrl !== 'undefined') {
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
  },

  // // UPGRADE
  // saveProfileImageAddress(user, dataOptions) {
  //   const databaseName = dataOptions.dbName;
  //   MongoClient.connect(
  //     this.config.getDatabaseRoot,
  //     {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true
  //     },
  //     function(error, db) {
  //       if(error) {
  //         console.warn("MyDatabase.saveProfileImageAddress error:" + error);
  //         return;
  //       }
  //       const dbo = db.db(databaseName);
  //       dbo
  //         .collection("users")
  //         .findOne({socketid: user.data.accessToken, online: true, confirmed: true}, function(err, result) {
  //           if(err) {
  //             console.log("MyDatabase.saveProfileImageAddress" + err);
  //             return null;
  //           }

  //           if(result !== null) {
  //             const userData = {
  //               accessToken: user.data.accessToken
  //             };

  //             var userFolder = process.cwd() + "public";
  //             var userFolderForSave = userFolder + "users-shared-data";

              
  //             if(!fs.existsSync(userFolder)) {
  //               fs.mkdirSync(userFolder);
  //             }

              
  //             if(!fs.existsSync(userFolderForSave)) {
  //               fs.mkdirSync(userFolderForSave);
  //             }

  //             // console.log( " TEST IMAGE UPLOAD " + process.cwd() );

  //             // hard code attacher regime
  //             ////////////////////////////
  //             //
  //             // if(process.cwd() == "/var/applications/rocket/rocket-craft-server") {
  //             //   // console.log( " THIS IS ATTACHER KO REGIME " + process.cwd() );
  //             //   userFolder = "/var/applications/kure/kure-server-client/public/users-shared-data/";
  //             // }

  //             userFolder += result.token;
  //             userFolderForSave += result.token;

  //             if(!fs.existsSync(userFolder)) {
  //               fs.mkdirSync(userFolder);
  //             }

  //             var generatedPathProfileImage = userFolder + "/profileImage.png";
  //             var generatedPathProfileImageLINK = userFolderForSave + "/profileImage.png";
  //             var base64Data = "";

  //             if(user.data.photo.indexOf("jpeg;base64") !== -1) {
  //               base64Data = user.data.photo.replace(/^data:image\/jpeg;base64,/, "");
  //             } else if(user.data.photo.indexOf("png;base64") !== -1) {
  //               base64Data = user.data.photo.replace(/^data:image\/png;base64,/, "");
  //             } else {
  //               console.log("MyDatabase.saveProfileImageAddress ERROR with photo data.");
  //               return;
  //             }

  //             fs.writeFile(generatedPathProfileImage, base64Data, "base64", function(err) {
  //               if(err) throw err;
  //               // file has been written to disk
  //               console.log("Photo profile saved. FULL PATH " + generatedPathProfileImage);

  //               // 

  //             });

  //             dbo
  //               .collection("users")
  //               .updateOne(
  //                 {socketid: user.data.accessToken},
  //                 {$set: {"profileUrl": generatedPathProfileImageLINK}},
  //                 function(err, result2) {
  //                   if(err) {
  //                     console.log("MyDatabase.saveProfileImageAddress (error in update profileUrl):", err);
  //                     return;
  //                   }
  //                   var userData = {
  //                     profilePhotoAdded: "Profile photo added.",
  //                     accessToken: user.data.accessToken
  //                   };
  //                   callerInstance.onUserNewProfileImage(userData, callerInstance);
  //                   db.close();
  //                 }
  //               );
  //           } else {
  //             // (user not found by accessToken)
  //             console.log("MyDatabase.saveProfileImageAddress  nulllll " + result);
  //           }
  //         });
  //     }
  //   );
  // }
}
