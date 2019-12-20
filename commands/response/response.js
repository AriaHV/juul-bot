const { RichEmbed, Client, Channel, Message } = require('discord.js');
const { sendResponseCommand } = require('../../utils/utils');

module.exports = {
	async execute(message, args) {
		const db = message.client.database;

		if (message.mentions.users.size < 1) {
			await message.reply('you need to mention one or more users to use a response command.');
			return;
		}

		const global = await Promise.all(message.mentions.users.map(user => db.isExcluded(user)));
		const guild = await Promise.all(message.mentions.users.map(user => db.isGuildExcluded(user, message.guild)));

		if (global.includes(true) || guild.includes(true)) {
			// Do stuff before returning
			return;
		}

		const commandName = args[0];
		const entries = await db.getResponseCommands(commandName);

		if (entries) {
			const entry = entries.rows[Math.floor(Math.random() * entries.rows.length)];
			await sendResponseCommand(message, entry);
		}


	},
};