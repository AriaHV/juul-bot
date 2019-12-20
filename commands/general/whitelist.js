const db = require('../../database/blacklist');

module.exports = {
	name: 'whitelist',
	aliases: ['-wl'],
	description: 'Whitelist tag-response commands for this user on a global scope. Same as `-j blacklist set global whitelist`',
	usages: ['whitelist'],

	async execute(message, args) {
		const database = message.client.database;
		const user = message.author;
		const status = await db.getGlobalBlacklisted(database, user);

		if (status == db.BlacklistStatus.whitelist) {
			await message.reply('you already whitelist tag-response commands on a global scope');
			return;
		}

		await db.setGlobalBlacklisted(database, user, false);
		await message.reply('you now whitelists tag-response commands on a global scope');
	},
};