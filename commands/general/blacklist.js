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

		let command;
		if (!args) {
			command = message.client.commands['blacklist'].get('no-arguments');
		}
		else {
			const commandName = args.shift();
			command =
				message.client.commands['blacklist'].get(commandName)
				|| message.client.commands['blacklist'].find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		}

		if (!command) return;

		try {
			command.execute(message, args);
		}
		catch (error) {
			console.error(error);
		}

		// await message.channel.send(`global:\t${globalBlacklistStatus}\n` +
		// `guild:\t${guildBlacklistStatus}` +
		// `channel:\t${channelBlacklistStatus}`);

	},
};