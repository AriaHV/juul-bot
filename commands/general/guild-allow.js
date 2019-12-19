const Discord = require('discord.js');

module.exports = {
	name: 'guild-allow',
	aliases: ['-ga'],
	description: 'Allow tag-response commands on a guild level.',
	usages: ['guild-allow'],

	async execute(message, args) {
		if (!(await message.client.database.isGuildExcluded(message.author, message.guild))) {
			await message.reply('you already allow tag-response commands on a guild level.');
			return;
		}

		await message.client.database.unregisterGuildExclusion(message.author, message.guild);
		await message.reply('you now allow tag-response commands on a guild level.');
	},
};