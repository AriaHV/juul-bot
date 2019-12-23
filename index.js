require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { Database } = require('./database/db.js');
const { getCommands, isBotAuthor, sendResponseCommand } = require('./utils');
const response = require('./commands/response/response');
const { getPrefixes, getPrefixedMessage } = require('./utils/prefixes');
const { getFamilies } = require('./utils/families');

const client = new Discord.Client();
client.database = new Database();
client.commands = getCommands();
client.families = getFamilies();
console.log(client.families);
console.log(client.families['general']);
client.testing = process.env.DISCORD_TOKEN ? false : true;
client.prefixes = getPrefixes(client.database, client.testing);
console.log(client.prefixes);

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ game: { name: `${client.prefixes[0].value + client.prefixes[0].seperator}help` } });

});

client.on('message', async message => {

	// Parse the message into a prefixedMessage and return if this is not a prefixed message or if the message author was a bot
	const prefixedMessage = getPrefixedMessage(message.content, message.client.prefixes);
	if (!prefixedMessage || message.author.bot) return;

	const prefix = prefixedMessage.prefix;
	const args = prefixedMessage.args;

	const family = client.families[args[0].toLowerCase()];
	if (family) {
		if (!family.main) {
			console.log('main module not found');
			return;
		}
		if (family.main.valid && !family.valid.main.valid(message)) {
			console.log('Command usage is not valid');
			return;
		}

		console.log('family.commands: ' + family.commands);
		args.unshift(family.commands);
		await family.main.execute(message, args);
		return;
	}

	await client.families['general'].execute(message, args);
});

client.login(process.env.DISCORD_TOKEN || process.env.DISCORD_TESTING_TOKEN);