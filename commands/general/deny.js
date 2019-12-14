const Discord = require('discord.js');

module.exports = {
	name: 'deny',
	aliases: ['-d'],
	description: 'Globally deny tag-response commands.',

	async execute(message, args) {
		if (await message.client.database.isExcluded(message.author)) {
			await message.reply('you already deny tag-response commands globally. ');
		}

		await message.client.database.registerExclusion(message.author);
	},
};