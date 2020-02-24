'use strict';

module.exports = {
	app: {
		port: process.env.PORT || 3006,
		environment: process.env.ENVIRONMENT || 'local'
	},
	aws: {},
	host: {},
	jwt: {
		cert: process.env.JWT_TOKEN_CERT
	}
};
