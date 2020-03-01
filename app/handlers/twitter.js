const Twit = require('twit');

const config = require(__base + '/app/config/config');
const slackModule = require(__base + '/app/modules/common/slack');

var T = new Twit({
	consumer_key: config.twitter.api_key,
	consumer_secret: config.twitter.secret_key,
	access_token: config.twitter.access_token,
	access_token_secret: config.twitter.token_secret
});

module.exports.findTrendingTweets = async (req, res) => {
	try {
		T.get('https://api.twitter.com/1.1/trends/place.json?id=1')
			.then(async (response) => {
				const trendingTweets = response.data[0].trends;

				//Get 5 tweets
				let listForAttachment = [];

				for (let i = 0; i <= 10; i++) {
					let currentVal = trendingTweets[i];
					if (!currentVal.tweet_volume) {
						currentVal.tweet_volume = 'N/A';
					}
					let tweetObj = {
						text: `${currentVal.name} - ${currentVal.tweet_volume} tweets`,
						value: currentVal.url
					};
					listForAttachment.push(tweetObj);
				}

				var data = {
					form: {
						token: config.slack.auth_token,
						channel: '#general',
						text: 'Hi! :wave: \n We foung 10 trending tweets.',
						attachments: [
							{
								// text: 'What report would you like to get?',
								// fallback: 'What report would you like to get?',
								color: '#2c963f',
								attachment_type: 'default',
								callback_id: 'trending_tweets',
								actions: [
									{
										name: 'reports_select_menu',
										text: 'Choose a tweet to view...',
										type: 'select',
										options: listForAttachment
									}
								]
							}
						]
					}
				};

				await slackModule.sendSlackMessage(data);
				res.json(data.form);
			})
			.catch((err) => {
				console.log(err);
				// reject();
			});

		// await slackModule.sendSlackMessage(response_body);
	} catch (e) {}
};

module.exports.handleTweetSelection = async (req, res) => {
	let selectedStringVal = req.body.payload;
	let jsonBody = JSON.parse(selectedStringVal);
	if (jsonBody.callback_id === 'trending_tweets' && jsonBody.team.domain === 'hazelnutworld') {
	}
	// console.log(jsonBody.actions);
	const response_body = {
		token: config.slack.auth_token,
		channel: '#general',
		text: `Use this url to checkout the trending tweets ${jsonBody.actions[0].selected_options[0].value}`
	};
	await slackModule.sendSlackMessage(response_body);
	res.json(response_body);
};
