const Discord = require('discord.js');

module.exports = {
	name: 'guild-deny',
	aliases: ['-gd'],
	description: 'Deny tag-response commands on a guild level.',
	usages: ['guild-deny'],

	async execute(message, args) {
		if (await message.client.database.isGuildExcluded(message.author, message.guild)) {
			await message.reply('you already deny tag-response commands on a guild level.');
			return;
		}

		await message.client.database.registerGuildExclusion(message.author, message.guild);
		await message.reply('you now deny tag-response commands on a guild level.');
	},
};