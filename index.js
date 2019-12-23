require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { Database } = require('./database/db.js');
const { getCommands, isBotAuthor, sendResponseCommand } = require('./utils');
const response = require('./commands/response/response');
const { getPrefixes, getPrefixedMessage } = require('./utils/prefixes');

const client = new Discord.Client();
client.database = new Database();
client.commands = getCommands();
client.testing = process.env.DISCORD_TOKEN ? false : true;
client.prefixes = getPrefixes(client.database, client.testing);
console.log(require('./config/testing.json'));
console.log(require('./config/testing.json').prefixes);
console.log(client.prefixes);

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ game: { name: `${client.prefixes[0].value + client.prefixes[0].seperator}help` } });

});

client.on('message', async message => {

	// Parse the message into a prefixedMessage and return if this is not a prefixed message or if the message author was a bot
	const prefixedMessage = getPrefixedMessage(message.content, message.client.prefixes);
	if (!prefixedMessage || message.author.bot) return;

	const prefixUsed = prefixedMessage.prefix;
	const argsUsed = prefixedMessage.args;
	const commandUsed = argsUsed.shift().toLowerCase();

	// Check for general and response commands
	let command =
		client.commands['general'].get(commandUsed)
		|| client.commands['general'].find(cmd => cmd.aliases && cmd.aliases.includes(commandUsed));

	// Check for author commands3
	if (isBotAuthor(message.author)) {
		const authorCommand = client.commands['author'].get(commandUsed)
			|| client.commands['author'].find(cmd => cmd.aliases && cmd.aliases.includes(commandUsed));
		if (authorCommand) command = authorCommand;
	}

	if (command) {
		try {
			await command.execute(message, argsUsed);
		}
		catch (error) {
			console.error(error);
		}
	}

	const responseCommandNames = await client.database.getResponseCommandNames();
	if (responseCommandNames.rows.map(x => x.command_name).includes(commandUsed)) {
		response.execute(message, [commandUsed]);
	}

});

client.login(process.env.DISCORD_TOKEN || process.env.DISCORD_TESTING_TOKEN);