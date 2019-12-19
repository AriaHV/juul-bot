const Discord = require('discord.js');

module.exports = {
	name: 'deny',
	aliases: ['-d'],
	description: 'Deny tag-response commands on a global level.',
	usages: ['deny'],

	async execute(message, args) {
		if (await message.client.database.isExcluded(message.author)) {
			await message.reply('you already deny tag-response commands on a global level.');
			return;
		}

		await message.client.database.registerExclusion(message.author);
		await message.reply('you now deny tag-response commands on a global level.');
	},
};