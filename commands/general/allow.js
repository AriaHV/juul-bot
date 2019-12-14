const Discord = require('discord.js');

module.exports = {
	name: 'allow',
	aliases: ['-a'],
	description: 'Globally allow tag-response commands.',

	async execute(message, args) {
		if (await !message.client.database.isExcluded(message.author)) {
			message.reply('you already allow tag-response commands globally. ');
		}

		await message.client.database.unregisterExclusion(message.author);
	},
};