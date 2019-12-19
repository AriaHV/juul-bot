const Discord = require('discord.js');

module.exports = {
	name: 'allow',
	aliases: ['-a'],
	description: 'Allow tag-response commands on a global level.',
	usages: ['allow'],

	async execute(message, args) {
		if (!(await message.client.database.isExcluded(message.author))) {
			await message.reply('you already allow tag-response commands on a global level.');
			return;
		}

		await message.client.database.unregisterExclusion(message.author);
		await message.reply('you now allow tag-response commands on a global level.');
	},
};