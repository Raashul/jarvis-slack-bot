const request = require('request');
const config = require(__base + '/app/config/config');

module.exports.validation = (body) => {
	try {
		if (body.token === config.slack.verification_token) {
			resolve();
		} else {
			reject({ code: 102, message: 'Invalid credentials' });
		}
	} catch (e) {
		reject();
	}
};

module.exports.extraValidationForTwitter = (body) => {
	return new Promise((resolve, reject) => {
		try {
			console.log(body);
			console.log(config);
			if (
				body !== null &&
				body.token === config.slack.verification_token &&
				body.user_name === config.twitter.twitter_username &&
				body.channel_id === config.slack.channel_id
			) {
				resolve();
			} else {
				reject({ code: 102, message: 'Invalid credentials' });
			}
		} catch (e) {
			console.log(e);
			reject({ code: 102, message: 'Internal Server Error' });
		}
	});
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
