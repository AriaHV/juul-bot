const fs = require('fs');
const Discord = require('discord.js');
const Database = require('./db.js');
const { token } = require('./secret.json');
const { prefixes } = require('./config.json');
const { getCommands } = require('./utils');

const client = new Discord.Client();

// Command collections
// client.database = new Database();

client.commands = getCommands();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ game: { name: '\'j help' } });

});

client.on('message', message => {
	const args = message.content.split(/ +/);

	if (!prefixes.includes(args[0]) || message.author.bot) return;

	const prefixUsed = args.shift().toLowerCase();
	const commandName = args.shift().toLowerCase();

	const command =
		client.commands['general'].get(commandName)
		|| client.commands['general'].find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
		|| client.commands['response'].get(commandName);

	if (!command) return;

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(token);