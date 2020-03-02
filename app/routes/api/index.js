'use strict';

const health = require(__base + '/app/handlers/health');
const route = require(__base + '/app/routes/config/constants');
const logger = require(__base + '/app/modules/common/logger');

const twitterHandler = require(__base + '/app/handlers/twitter');
const jokesHandler = require(__base + '/app/handlers/jokes');

exports = module.exports = (app) => {
	app.get('/', (req, res) => res.send('Hello World!'));

	//Slackbot Jokes Endpoint
	app.post(route.jokes, jokesHandler.tellMeAJoke);

	app.post(route.twitterTrends, twitterHandler.findTrendingTweets);

	//interactive slack component endpoint
	app.post(route.slack_interactive_component, twitterHandler.handleTweetSelection);

	app.post(route.twitterTweet, twitterHandler.tweet);
	// logger.info(`Routes initialized.`);
};
