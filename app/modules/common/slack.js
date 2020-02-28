const request = require('request');
const config = require(__base + '/app/config/config');

module.exports.validation = (body) => {
	try {
		if (body.token === config.slack.verification_token) {
			resolve();
		} else {
			reject();
		}
	} catch (e) {
		reject();
	}
};

module.exports.sendSlackMessage = (body) => {
	try {
		return new Promise((resolve, reject) => {
			request.post('https://slack.com/api/chat.postMessage', body, function(error, response, body) {
				resolve();
			});
		});
	} catch (e) {
		console.log(e);
		reject();
	}
};
