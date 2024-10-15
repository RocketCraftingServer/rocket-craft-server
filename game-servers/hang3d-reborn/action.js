let MongoClient = require("mongodb").MongoClient;
module.exports = {
	setVisitors(user, dataOptions) {
		const databaseName = dataOptions.dbName;
		return new Promise((resolve) => {
			MongoClient.connect(
				dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
				function(error, db) {
					if(error) {
						resolve({status: 'error in MyDatabase setVisitors'})
						return;
					}
					const dbo = db.db(databaseName);
					user.myIp = user.myIp.replace("::ffff:", "")
					dbo.collection("visitors").insertOne({
						userAgent: user.userAgent,
						email: user.email,
						fromUrl: user.fromUrl,
						ip: user.myIp,
						isRegular: user.isRegular
					}, {}, function(err, result) {
						if(err) {resolve({status: "WRONG DB QUERY"})}
						if(result !== null) {
							console.warn("Visitors added=> ", user.myIp);
							resolve({status: "VISITOR_WELCOME"});
							db.close();
						} else {
							resolve({status: "VISITORS ERR"});
							db.close();
						}
					});
				})
		})
	}
}