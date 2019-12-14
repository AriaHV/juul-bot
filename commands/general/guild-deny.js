const Discord = require('discord.js');

module.exports = {
	name: 'guild-deny',
	aliases: ['-gd'],
	description: 'Locally deny tag-response commands.',

	async execute(message, args) {
		if (await message.client.database.isGuildExcluded(message.author, message.guild)) {
			await message.reply('you already deny locally tag-response commands.');
			return;
		}

		await message.client.database.registerGuildExclusion(message.author, message.guild);
		await message.reply('you now locally allow tag-response commands.');
	},
};