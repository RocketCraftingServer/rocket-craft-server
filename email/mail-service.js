const shared = require("../common/shared");
const nodemailer = require('nodemailer');
const {MailtrapTransport} = require("mailtrap");
/**
 * @description Only objective for this class is
 * sending emails.
 */

var config = require("../server.js");

class Sender {
	constructor(to, subject, content) {
		this.userId = shared.formatUserKeyLiteral(to);
		this.subject = subject;
		this.to = to;
		this.content = content;
	}

	async SEND(subject) {
		const transporter = nodemailer.createTransport({
			host: config.systemEmail.host,
			port: 587,
			tls: {
				secure: false,
				ignoreTLS: true,
				rejectUnauthorized: false
			},
			auth: {
				user: config.systemEmail.user,
				pass: config.systemEmail.pass,
			}
		});

		transporter.verify(function(error, success) {
			if(error) {
				console.log("EMAIL SERVICE FAILED" + error);
			} else {
				console.log('Server validation done and ready for messages.')
			}
		});

		const email = {
			from: 'GamePlay@maximumroulette.com',
			to: this.to,
			subject: this.subject,
			html: this.content
		};

		transporter.sendMail(email, function(error, success) {
			if(error) {
				console.log('Nodemailer Email failed: ' + error);
			} else {
				console.log('Nodemailer Email sent: ' + success.response);
			}
		})
	}

	async SEND2(subject) {
		return new Promise((resolve, reject) => {
			const TOKEN = config.systemEmail.TOKEN;
			const SENDER_EMAIL = config.systemEmail.SENDER_EMAIL;
			const RECIPIENT_EMAIL = this.to;
			const transport = nodemailer.createTransport(MailtrapTransport({token: TOKEN}))
			transport.sendMail({
				text: "ROCK",
				to: {
					address: RECIPIENT_EMAIL,
					name: "GamePlay platform ROCK"
				},
				from: {
					address: SENDER_EMAIL,
					name: "GamePlay platform ROCK"
				},
				subject: this.subject,
				html: this.content
			}).then(() => {
				console.log('SENDED')
				resolve()
			}).catch((err) => {
				console.error(err)
				reject()
			})
		})
	}
}
module.exports = (to, subject, content) => {return new Sender(to, subject, content)}
