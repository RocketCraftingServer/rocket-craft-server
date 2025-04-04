let MongoClient = require("mongodb").MongoClient;
module.exports = {

	getActiveList(user, dataOptions) {

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
								// console.warn("Session passed:" , user.myIp);
								user.myIp = user.myIp.replace("::ffff:", "")
								var usersData = {
									status: "ACTIVE_LIST_PASSED",
								};
								dbo.collection("activegames").find({}, {}).toArray(function(err, aresult) {
									if(err) {
										console.warn("Profile actions profile error:" + err);
										resolve({status: "WRONG DB QUERY"});
									}
									if(aresult !== null) {
										var localCheck = true;
										aresult.forEach((item => {
											if(item.userNickname === result.nickname) {
												console.log("ALREADY_IN_ACTIVE_LIST", item)
												localCheck = false;
											}
										}));
										if(localCheck === false) {
											db.close();
											return resolve({status: "ALREADY_IN_ACTIVE_LIST"});
										}
										console.log("No in active list , add in active list", user.gameName)
										dbo.collection("activegames").insertOne({
											gameDescription: "Hosted by " + result.nickname,
											userid: result.nickname,
											userNickname: result.nickname,
											sessionMapName: user.mapName,
											sessionHostIp: user.myIp,
											gameName: user.gameName,
											gameHostAlias: user.gameHostAlias
										}, function(test) {
											console.log('Mashine added to server active list. GOOD.')
											console.log(test)
											resolve(usersData);
											db.close();
										});
									}
								})
							} else {
								db.close();
								resolve({status: "WRONG_PASS_ACTIVELIST"});
							}
						} else {
							db.close();
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
								console.warn("Session passed <BASIC> w is myIp ", user.myIp);
								user.myIp = user.myIp.replace("::ffff:", "")
								var usersData = {
									status: "RESULT NULL",
								};
								var newResult = result.points + 10;
								dbo.collection("users").updateOne({email: user.email}, {$set: {points: newResult}}, function(err, aresult) {
									if(err) {
										console.warn("Profile actions pointplus10 error :" + err);
										resolve({status: "WRONG DB QUERY"});
									}
									if(aresult !== null) {
										resolve({status: "POINTS_ACTION_POINTPLUS", userPoints: newResult});
										db.close();
										console.log("POINTS_ACTION_POINTPLUS")
									} else if(aresult == null) {
										resolve(usersData);
										db.close();
									}
								})

							} else {
								resolve({status: "WRONG_PASS_POINTPLUS"});
								db.close();
							}
						} else {
							db.close();
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
				dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
				function(error, db) {
					if(error) {
						console.warn("getLeaderboardResponse error :" + error);
						resolve({status: 'error in MyDatabase getLeaderboardResponse'})
						return;
					}
					const dbo = db.db(databaseName);
					var leaderboardSort = {points: -1};

					dbo.collection("users").findOne({
						token: user.token,
						confirmed: true,
						online: true,
						email: user.email
					}, {}, function(err, result) {
						if(err) {
							console.warn("getLeaderboardResponse error :" + err);
							resolve({status: "WRONG DB QUERY"});
						}
						if(result !== null) {
							if(result.token) {
								// console.warn("Session passed <BASIC> remote IP => ", user.myIp);
								user.myIp = user.myIp.replace("::ffff:", "")
								var usersData = {
									status: "RESULT NULL",
								};

								var skipValue = 0;
								if(typeof user.criterium === 'undefined') {
									user.criterium = {
										description: 'list-all',
										moreExploreUsers: 0
									}
								}

								if(user.criterium.description == 'paginator') {
									var limitValue = parseFloat(user.criterium.limitValue);
									if(user.criterium.currentPagIndex) {
										skipValue = (parseFloat(user.criterium.currentPagIndex) - 1) * limitValue;
									}
								} else if(user.criterium.description == 'list-all') {
									skipValue = 0;
									var limitValue = 20;
									if(user.criterium.moreExploreUsers > 0) {
										skipValue += limitValue * user.criterium.moreExploreUsers;
									}
									console.log("Good list-all skipValue", skipValue, " limitValue", limitValue)
								}

								dbo.collection("users").find({confirmed: true}, {})
									.skip(skipValue).limit(limitValue).sort(leaderboardSort).toArray(function(err, aresult) {
										if(err) {
											console.warn("Profile actions get leaderboard error :" + err);
											resolve({status: "WRONG DB QUERY"});
										}
										if(aresult !== null) {
											var leaderboardHandleData = [];
											aresult.forEach(function(item) {
												leaderboardHandleData.push({
													nickname: item.nickname,
													points: item.points,
													rank: item.rank
												}
												)
											})

											resolve({status: "LEADERBOARD_DATA", leaderboard: leaderboardHandleData});
											db.close();
											// console.log("LEADERBOARD_DATA")

										} else if(aresult == null) {
											db.close();
											resolve(usersData);
										}
									})

							} else {
								resolve({status: "WRONG_PASS_ACTIVELIST"});
								db.close();
							}
						} else {
							db.close();
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

								dbo.collection("activegames").find({userNickname: result.nickname}, {}).toArray(function(err, aresult) {
									if(err) {
										console.warn("Remove from server list actions error: " + err);
										resolve({status: "WRONG DB QUERY"});
									}
									if(aresult !== null) {
										if(aresult.length == 0) {
											resolve({
												status: "NOT_IN_ACTIVE_SERVER_LIST",
											});
											db.close();
										} else {

											dbo.collection("activegames").deleteOne({userNickname: result.nickname}, {}, function(err, oresult) {
												if(err) {
													console.warn("Remove from server list actions error: " + err);
													resolve({status: "WRONG DB QUERY IN REMOVE PROCEDURE."});
												}

												// console.log(" TEST ", oresult.deletedCount);
												if(oresult.deletedCount == 1) {
													resolve({
														status: "REMOVE_FROM_ACTIVE_LIST_PASSED",
														activelist: aresult
													});
													db.close();
												} else {
													resolve({
														status: "REMOVE_FROM_ACTIVE_LIST_PASSED",
														errorStatus: "UNKNOW_ERROR",
														activelist: aresult
													});
													db.close();
												}
											});
										}
									} else {
										var usersData = {
											status: "RESULT_NULL"
										};
										resolve(usersData);
										db.close();
									}
								})
							} else {
								resolve({status: "WRONG_PASSWORD"});
								db.close();
							}
						}
					});
				})
		})
	},

	updateProfilePointsAfterDead(user, dataOptions) {

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
								// console.warn("Session passed <BASIC> w is myIp " , user.myIp);
								user.myIp = user.myIp.replace("::ffff:", "")
								var usersData = {
									status: "RESULT NULL",
								};
								var newResult = result.points - 30;
								dbo.collection("users").updateOne({email: user.email}, {$set: {points: newResult}}, function(err, aresult) {
									if(err) {
										console.warn("Profile actions pointplus10 error :" + err);
										resolve({status: "WRONG DB QUERY"});
									}
									if(aresult !== null) {
										resolve({status: "POINTS_ACTION_ONDEAD", userPoints: newResult});
										db.close();
										console.log("POINTS_ACTION_ONDEAD")
									} else if(aresult == null) {
										resolve(usersData);
										db.close();
									}
								})

							} else {
								resolve({status: "WRONG_PASS_POINTPLUS"});
								db.close();
							}
						} else {
							db.close();
						}
					});
				})
		})
	},

	getPublicLeaderboard(_, dataOptions) {
		const databaseName = dataOptions.dbName;
		return new Promise((resolve) => {
			var root = this;
			MongoClient.connect(dataOptions.dbRoot, {useNewUrlParser: true, useUnifiedTopology: true},
				function(error, db) {
					if(error) {
						resolve({status: 'error in MyDatabase getLeaderboardResponse'})
						return;
					}
					const dbo = db.db(databaseName);
					var leaderboardSort = {points: -1};
					console.warn("++++++++++++++++=> ");
					var usersData = {
						status: "RESULT NULL",
					};
					var skipValue = 0;
					var user = {} 
					user.criterium = {
						description: 'list-all',
						moreExploreUsers: 0,
						limitValue: 10
					}

					var limitValue = parseFloat(user.criterium.limitValue);
					if(user.criterium.currentPagIndex) {
						skipValue = (parseFloat(user.criterium.currentPagIndex) - 1) * limitValue;
					}

					dbo.collection("users").find({confirmed: true}, {})
						.skip(skipValue).limit(limitValue).sort(leaderboardSort).toArray(function(err, aresult) {
							if(err) {console.warn("Profile actions get leaderboard error :" + err);
								resolve({status: "WRONG DB QUERY"});
							}
							if(aresult !== null) {
								var leaderboardHandleData = [];
								aresult.forEach(function(item) {
									leaderboardHandleData.push({
										nickname: item.nickname,
										points: item.points,
										rank: item.rank
									})
								})
								resolve({status: "LEADERBOARD_DATA", leaderboard: leaderboardHandleData});
								db.close();
								console.log("LEADERBOARD_DATA CLOSE")
							} else if(aresult == null) {
								db.close();
								resolve(usersData);
							}
						})
				})
		})
	}

}