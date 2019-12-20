const { Database } = require('../../database/db');
const { RichEmbed } = require('discord.js');

module.exports = {
	name: 'profile',
	aliases: ['-p'],
	description: 'Displays profile information. This includes allowing-denying commands.',
	usages: ['profile'],

	async execute(message, args) {
		let exclusionText = 'allow response commands [global]:\t';
		let guildExclusionText = 'allow response commands [guild]:\t';

		exclusionText += await message.client.database.isExcluded(message.author) ? 'deny' : 'allow';
		guildExclusionText += await message.client.database.isGuildExcluded(message.author, message.guild) ? 'deny' : 'allow';
		const exclusionPrefix = await message.client.database.isExcluded(message.author) ? '- ' : '+ ';
		const guildExclusionPrefix = await message.client.database.isGuildExcluded(message.author, message.guild) ? '- ' : '+ ';

		const embedDescription = `**${message.author.username}'s profile**` +
		'```diff\n' +
		exclusionPrefix + exclusionText + '\n' +
		guildExclusionPrefix + guildExclusionText +
		'```';

		const embed = new RichEmbed()
			.setDescription(embedDescription);

		await message.channel.send(embed);
	},
};