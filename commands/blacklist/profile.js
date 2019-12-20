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

		const globalBlacklist = getProfileBlacklistString('global', await db.getGlobalBlacklisted(database, user));
		const guildBlacklist = getProfileBlacklistString('guild', await db.getGuildBlacklistStatus(database, user, guild));
		const channelBlacklist = getProfileBlacklistString('channel', await db.getChannelBlacklistStatus(database, user, channel));
		const s = [globalBlacklist, guildBlacklist, channelBlacklist].join('\n');

		const embedDescription = `**${user.username}'s blacklist profile**` +
        '```diff\n' +
        s +
		'```';

		const embed = new RichEmbed()
			.setDescription(embedDescription);

		await message.channel.send(embed);
	},
};