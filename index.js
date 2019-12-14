const fs = require('fs');
const Discord = require('discord.js');
const { Database } = require('./db.js') ;
const { token } = require('./secret.json');
const { prefixes } = require('./config.json');
const { getCommands, isBotAuthor } = require('./utils');

const client = new Discord.Client();
client.database = new Database();
client.commands = getCommands();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ game: { name: `${prefixes[0]} help` } });

});

client.on('message', async message => {
	const args = message.content.split(/ +/);

	if (!prefixes.includes(args[0]) || message.author.bot) return;

	const prefixUsed = args.shift().toLowerCase();
	const commandName = args.shift().toLowerCase();

	// Check for general and response commands
	let command =
		client.commands['general'].get(commandName)
		|| client.commands['general'].find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	const invalidMentions =
	(await Promise.all(message.mentions.users.map(user => client.database.isAnyExcluded(user, message.guild))))
		.filter(x => x)
		.includes(true);

	if (!invalidMentions) {
		const responseCommand = client.commands['response'].get(commandName);
		if (responseCommand) command = responseCommand;
	}

	// Check for author commands3
	if (isBotAuthor(message.author)) {
		const authorCommand = client.commands['author'].get(commandName)
		|| client.commands['author'].find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (authorCommand) command = authorCommand;
	}

	if (!command) return;

	try {
		await command.execute(message, args);
	}
	catch (error) {
		console.error(error);
	}
});

client.login(token);