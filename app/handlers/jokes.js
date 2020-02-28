const config = require(__base + '/app/config/config');
const axios = require('axios');

const slackModule = require(__base + '/app/modules/common/slack');
const jokeHandler = require(__base + '/app/modules/jokes/joke');

module.exports.tellMeAJoke = async (req, res) => {
	try {
		const body = req.body;
		// await slackModule.validation(body);
		const joke = await jokeHandler.getNewJoke();
		const response_body = {
			token: config.slack.auth_token,
			channel: '#general',
			text: `#${joke.type} \n ${joke.setup} \n ${joke.punchline}`
		};

		await slackModule.sendSlackMessage(response_body);
		res.json(response_body);
	} catch (e) {}
};
