const { RichEmbed, Client, Channel, Message } = require('discord.js');
const { sendResponseCommand } = require('../../utils/response');
const { allowResponseCommands } = require('../../utils/blacklist');

module.exports = {
	async execute(message, args) {
		if (message.mentions.users.size < 1) {
			await message.reply('you need to mention one or more users to use a response command.');
			return;
		}

		const database = message.client.database;
		const mentioned = message.mentions.users;
		const guild = message.guild;
		const channel = message.channel;

		// On any user blacklisting response commands, send a DM to the author and return
		const allow = await allowResponseCommands(database, mentioned, guild, channel);
		if (!allow) {
			const dm = await message.author.createDM();
			await dm.send('One of the members you just mentioned blacklists response-commands.');
			return;
		}

		const name = args[0];
		await sendResponseCommand(message, name);
	},
};