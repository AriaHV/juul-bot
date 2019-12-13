const Discord = require('discord.js');

module.exports = {
	name: 'allow',
	aliases: ['-a'],
	description: 'Globally allow tag-response commands.',

	execute(message, args) {
		if (!message.client.database.isExcluded(message.author)) {
			message.reply('You already allow tag-response commands globally. ');
		}

		message.client.database.unregisterExclusion(message);
	},
};