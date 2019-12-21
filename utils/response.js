const { Client, RichEmbed } = require('discord.js');
const { blacklist } = require('./blacklist');
const { response } = require('../database/response');

const sendResponseCommand = async (message, name) => {
	const entry = await getEntry(message, name);
	const variables = getVariables(message);
	const text = getText(message, entry, variables);

	const embed = new RichEmbed().setImage(entry.embed_image);
	await message.channel.send(text + '\n' + embed);
};

const getText = (message, entry, variables) => {
	const mentioned = message.mentioned;
	const client = message.client;
	const author = { user: message.author, member: message.member };
	let text;

	// Get raw text based on who's mentioned
	if (mentioned.users.length == 1 && mentioned.users[0].equals(client.user)) { text = 'You mentioned the me! Thank you ${author}'; }
	else if (mentioned.users.length == 1 && mentioned.users[0].equals(author.user)) { text = '${author}, you mentioned yourself. I\'ll give you some attention!'; }
	else { text = entry.embed_description; }

	// Insert variables into raw text
	const matches = text.match(/\$\{\w+\}/g);
	for (const match of matches) {
		const value = variables[match];
		if (value) text = text.replace(match, value);
	}

	return text;
};

const getEntry = async (message, name) => {
	const database = message.client.database;
	const entries = await response.getResponseEntries(database, name);

	// Return if entries could not be found
	if (!entries) return;
	return entries.rows[Math.floor(Math.random() * entries.rows.length)];
};

const getVariables = (message) => {
	const variables = [];
	variables['${author}'] = message.member.nickname || message.author.username;
	variables['${mentioned}'] = message.mentions.members.map(member => member.nickname || member.user.username).join(', ');
	return variables;
};


module.exports = {};