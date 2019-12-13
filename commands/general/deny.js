const Discord = require('discord.js');

module.exports = {
	name: 'deny',
	aliases: ['-d'],
	description: 'Globally deny tag-response commands.',

	execute(message, args) {
		if (message.client.database.isExcluded(message.author)) {
			message.reply('You already deny tag-response commands globally. ');
		}

		message.client.database.registerExclusion(message);
	},
};