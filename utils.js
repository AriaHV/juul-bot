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

module.exports = { getCommands, isBotAuthor };