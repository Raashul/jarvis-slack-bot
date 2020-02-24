'use strict';

const jwt = require('jsonwebtoken');

const logger = require(__base + '/app/modules/common/logger');
const config = require(__base + '/app/config/config');
const response = require(__base + '/app/modules/common/response');

module.exports.authCheck = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const authInfo = await authenticateToken(req.request_id, token);

		logger.debug(req.request_id, `User: ${authInfo.user_id} successfully authorized.`);
		authInfo.authorizedEndpointRoles = authorizedEndpointRoles;
		req.authInfo = authInfo;

		return next();
	} catch (e) {
		response.failure(req.request_id, e, res);
	}
};

function authenticateToken(request_id, token) {
	return new Promise((resolve, reject) => {
		if (token) {
			logger.debug(request_id, `token is: ${token}`);
			jwt.verify(token, config.jwt.cert, (err, decoded) => {
				if (err) {
					logger.debug(request_id, `Failed to authenticate token - ${err.name}`, err);
					reject({ code: 105, custom_message: 'Failed to authenticate token' });
				} else {
					const authInfo = {
						token,
						tokenData: decoded,
						user_id: decoded.user_id,
						merchant_id: decoded.merchant_id,
						roles: decoded.roles,
						exp: decoded.exp,
						iat: decoded.iat
					};

					resolve(authInfo);
				}
			});
		} else {
			logger.warn(request_id, 'There is no token', token);
			reject({ code: 105, custom_message: 'Authentication Token not provided' });
		}
	});
}
