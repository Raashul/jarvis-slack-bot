const slackModule = require(__base + '/app/modules/common/slack');
const config = require(__base + '/app/config/config');

module.exports.tellMeAJoke = async (req, res) => {
	try {
		const body = req.body;
		const reportsList = [
			{
				text: 'User Activity',
				value: 'userActivity'
			}
		];
		const response_body = {
			token: config.slack.auth_token,
			channel: '#general',
			text: "Hi! :wave: \n I'm your new bot."
			// attachments: [
			// 	{
			// 		text: 'What report would you like to get?',
			// 		fallback: 'What report would you like to get?',
			// 		color: '#2c963f',
			// 		attachment_type: 'default',
			// 		callback_id: 'report_selection',
			// 		actions: [
			// 			{
			// 				name: 'reports_select_menu',
			// 				text: 'Choose a report...',
			// 				type: 'select',
			// 				options: reportsList
			// 			}
			// 		]
			// 	}
			// ]
		};
		await slackModule.sendSlackMessage(response_body);
		res.json(response_body);
	} catch (e) {}
};
