const { RichEmbed, Client, Channel, Message } = require('discord.js');
const { sendResponseCommand } = require('../../utils');
const { allowResponseCommands } = require('../../utils/blacklist');

module.exports = {
	async execute(message, args) {

		if (message.mentions.users.size < 1) {
			await message.reply('you need to mention one or more users to use a response command.');
			return;
		}

		const database = message.Client.database;
		const mentioned = message.mentions.users;
		const guild = message.guild;
		const channel = message.channel;

		const allow = await allowResponseCommands(database, mentioned, guild, channel);
		if (!allow) return;

		const commandName = args[0];
		const entries = await database.getResponseCommands(commandName);

		if (entries) {
			const entry = entries.rows[Math.floor(Math.random() * entries.rows.length)];
			await sendResponseCommand(message, entry);
		}


	},
};