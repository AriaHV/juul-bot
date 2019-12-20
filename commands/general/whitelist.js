const db = require('../../database/blacklist');

module.exports = {
	name: 'whitelist',
	aliases: ['-wl'],
	description: 'Whitelist tag-response commands for this user on a global scope. Same as `-j blacklist set global whitelist`',
	usages: ['whitelist'],

	async execute(message, args) {
		const database = message.client.database;
		const user = message.author;
		const whitelisted = (await db.getGlobalBlacklisted(database, user) == db.BlacklistStatus.whitelist);

		if (whitelisted) {
			message.reply('you already whitelist tag-response commands on a global scope');
			return;
		}

		db.setGlobalBlacklisted(database, user, true);
		message.reply('you now whitelists tag-response commands on a global scope');
	},
};