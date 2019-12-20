const db = require('../../database/blacklist');

module.exports = {
	name: 'blacklist',
	aliases: ['-bl'],
	description: 'A command for tag-response command blacklist management.',
	usages: ['blacklist', 'blacklist set [scope] [value]'],

	async execute(message, args) {
		let command;
		if (args.length == 0) {
			command = message.client.commands['blacklist'].get('no-argument');

			// TODO: remove when done
			console.log('[blacklist.execute]: ' + command);
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