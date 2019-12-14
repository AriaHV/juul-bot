const Discord = require('discord.js');

module.exports = {
	name: 'allow',
	aliases: ['-a'],
	description: 'Globally allow tag-response commands.',

	async execute(message, args) {
		if (!(await message.client.database.isExcluded(message.author))) {
			await message.reply('you already allow tag-response commands globally.');
			return;
		}

		await message.client.database.unregisterExclusion(message.author);
		await message.reply('you now globally allow tag-response commands.');
	},
};