const { prefixes } = require('../config.json');

const getHelpHeaderString = () => {
	return 	'**juul** - a general purpose bot\n\n' +
			'*Hi, I\'m Juul. I bring a variety of functionality ' +
			' to your guild. My biggest strength? I will not reply to you with ' +
			'response gifs if you don\'t want me to.';
};

const getCommandsHelpString = (collection) => {
	collection = collection.map(x => getCommandString(x));
	return collection.join('\n\n');
};

const getCommandString = (command) => {
	return 	[getCommandTitleString(command),
		getDescriptionString(command),
		getCommandUsagesString(command)].join('\n');
};

const getCommandTitleString = (command) => {
	return `**command: ${command.name}**`;
};

const getDescriptionString = (command) => {
	return '*description*: ' + command.description;
};

const getCommandUsagesString = (command) => {
	return '*usages*: ' + command.usages.map(x => `\`${prefixes[0]} ${x}\``).join(', ');
};

module.exports = { getHelpHeaderString, getCommandsHelpString };