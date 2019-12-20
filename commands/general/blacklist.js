const db = require('../../database/blacklist');

module.exports = {
	name: 'blacklist',
	aliases: ['-bl'],
	description: 'A command for tag-response command blacklist management.',
	usages: ['blacklist', 'blacklist set [scope] [value]'],

	async execute(message, args) {
		const database = message.client.database;
		const user = message.author;
		const guild = message.guild;
		const channel = message.channel;

		const globalBlacklistStatus = await db.getGlobalBlacklisted(database, user);
		const guildBlacklistStatus = await db.getGuildBlacklistStatus(database, user, guild);
		const channelBlacklistStatus = await db.getChannelBlacklistStatus(database, user, channel);

		await message.channel.send(`global:\t${globalBlacklistStatus}` +
                                    `guild:\t${guildBlacklistStatus}` +
                                    `channel:\t${channelBlacklistStatus}`);
	},
};