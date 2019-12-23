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

	const prefixUsed = prefixedMessage.prefix;
	const argsUsed = prefixedMessage.args;
	const familyUsed = argsUsed.shift().toLowerCase();

	const family = client.families[familyUsed];

	if (!family) {
		console.log('family not found');
		return;
	}

	if (!family.main) {
		console.log('main module not found');
		return;
	}

	if (family.main.valid && !family.valid.main.valid(message, argsUsed)) {
		console.log('Command usage is not valid');
		return;
	}

	await family.main.execute(message, argsUsed);
});

client.login(process.env.DISCORD_TOKEN || process.env.DISCORD_TESTING_TOKEN);