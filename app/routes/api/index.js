'use strict';

const health = require(__base + '/app/handlers/health');
const route = require(__base + '/app/routes/config/constants');
const logger = require(__base + '/app/modules/common/logger');

const jokesHandler = require(__base + '/app/handlers/jokes');

exports = module.exports = (app) => {
	app.get('/', (req, res) => res.send('Hello World!'));

	//Slackbot Jokes Endpoint
	app.post(route.jokes, jokesHandler.tellMeAJoke);

	app.get('/random', jokesHandler.tellMeAJoke);

	// logger.info(`Routes initialized.`);
};
