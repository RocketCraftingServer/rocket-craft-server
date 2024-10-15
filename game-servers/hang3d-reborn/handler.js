var action = require("./action");

class ResponseHandler {

	constructor(crypto, dataOptions) {
		this.crypto = crypto;
		this.dataOptions = dataOptions;
	}

	async getResponseVisitors(req, res) {
		console.log("/rocket/visitors", req.body);
		console.log("/rocket/visitors : ", req.connection.remoteAddress);
		var user = {
			userAgent: req.body.userAgent,
			email: req.body.email,
			myIp: req.connection.remoteAddress,
			fromUrl: req.body.fromUrl,
			isRegular: req.body.isRegular
		};
		var responseFlag = await action.setVisitors(user, this.dataOptions)
		console.log("/rocket/visitors", responseFlag.leaderboard);
		if(responseFlag.status == "VISITOR_WELCOME") {
			res.status(200).json({
				message: "Look like regular visitor you are welcome.",
				rocketStatus: responseFlag.status
			})
		} else {
			res.status(401).json({
				message: "Maybe you are developer interest in who this works.",
				rocketStatus: "Maybe Bad Request"
			})
		}
	}
}

module.exports = ResponseHandler
