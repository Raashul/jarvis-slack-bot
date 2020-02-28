const axios = require('axios');
const config = require(__base + '/app/config/config');

module.exports.getNewJoke = async (body) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(config.jokes_url);
			resolve(response.data);
		} catch (e) {
			console.log('e', e);
			reject({ code: 102, message: 'Internal Server Error' });
		}
	});
};
