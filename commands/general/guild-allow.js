const Discord = require('discord.js');

module.exports = {
	name: 'guild-allow',
	aliases: ['-ga'],
	description: 'Locally allow tag-response commands.',

	async execute(message, args) {
		if (!(await message.client.database.isGuildExcluded(message.author, message.guild))) {
			await message.reply('you already allow locally tag-response commands.');
			return;
		}

		await message.client.database.unregisterGuildExclusion(message.author, message.guild);
		await message.reply('you now locally allow tag-response commands.');
	},
};