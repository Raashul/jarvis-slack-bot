const request = require('request');
const config = require(__base + '/app/config/config');

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
