const { RichEmbed } = require('discord.js');
const db = require('../../database/blacklist');
const { getProfileBlacklistString } = require('../../utils/blacklist');

module.exports = {
	name: 'profile',
	aliases: ['-p'],
	description: 'Displays blacklist profile.',
	usages: ['blacklist profile'],

	async execute(message, args) {
		const database = message.client.database;
		const user = message.author;
		const guild = message.guild;
		const channel = message.channel;


		const globalStatus = await db.getGlobalBlacklisted(database, user);
		const guildStatus = await db.getGuildBlacklistStatus(database, user, guild);
		const channelStatus = await db.getChannelBlacklistStatus(database, user, channel);

		const statuses = [];
		statuses.push({ scope:'global', status: globalStatus });
		statuses.push({ scope:guild.name, status: globalStatus });
		statuses.push({ scope:channel.name, status: globalStatus });
		const s = getProfileBlacklistString(statuses, 2);

		const embedDescription = `**${user.username}'s blacklist profile**` +
        '```diff\n' +
        s +
		'```';

		const embed = new RichEmbed()
			.setDescription(embedDescription);

		await message.channel.send(embed);
	},
};