const db = require('../../database/blacklist');

module.exports = {
	name: 'no-argument',
	aliases: [],
	description: 'Blacklist tag-response commands for this user on a global scope.',
	usages: ['blacklist'],

	async execute(message, args) {
		const database = message.client.database;
		const user = message.author;
		const blacklisted = (await db.getGlobalBlacklisted(database, user) == db.BlacklistStatus.blacklist);

		if (blacklisted) {
			await message.reply('you already blacklist tag-response commands on a global scope');
			return;
		}

		await db.setGlobalBlacklisted(database, user, true);
		await message.reply('you now blacklist tag-response commands on a global scope');
	},
};