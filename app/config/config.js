'use strict';

module.exports = {
	app: {
		port: process.env.PORT || 3001,
		environment: process.env.ENVIRONMENT || 'local'
	},
	aws: {},
	host: {},
	jwt: {
		cert: process.env.JWT_TOKEN_CERT
	},
	slack: {
		auth_token: process.env.SLACK_AUTH_TOKEN,
		verification_token: process.env.SLACK_VERIFICATION_TOKEN
	},
	jokes_url: 'https://official-joke-api.appspot.com/random_joke'
};
