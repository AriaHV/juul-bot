const { readdirSync, statSync, Dirent } = require('fs');
const Discord = require('discord.js');
const { authorId } = require('./config.json');

const getCommands = () => {
	const commands = {};
	const directories = readdirSync('./commands').filter(x => statSync(`./commands/${x}`).isDirectory());

	for (const dir of directories) {
		commands[dir] = new Discord.Collection();

		const files = readdirSync(`./commands/${dir}`).filter(x => x.endsWith('.js'));

		for (const file of files) {
			const command = require(`./commands/${dir}/${file}`);
			commands[dir].set(command.name, command);
		}
	}
	return commands;
};

const isBotAuthor = (user) => {
	return user.id == authorId;
};

const sendResponseCommand = (message, entry, args) => {
	const variables = {};
	variables['${mentioned}'] = message.mentions.users
		.map(user => user.username)
		.join(', ');

	variables['${author}'] = message.author.username;

	// eslint-disable-next-line no-useless-escape
	const matches = entry.embed_description.match(/\$\{\w+\}/g);
	console.log(matches + ': ' + entry.embed_description);

	let embedDescription = entry.embed_description;
	console.log(matches);
	for (const match of matches) {
		const value = variables[match];
		if (value) embedDescription = embedDescription.replace(match, value);
	}

	const embed = new Discord.RichEmbed()
		.setImage(entry.embed_image)
		.setDescription(embedDescription);

	return message.channel.send(embed);
};

const getExclusionString = (scope, excluded) => {
	return (excluded ? '-' : '+') + ` [${scope}]: ` + (excluded ? 'deny' : 'allow');
};

module.exports = { getCommands, isBotAuthor, sendResponseCommand, getExclusionString };