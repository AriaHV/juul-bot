const { prefixesBot } = require('./../config/prefixes.json');
const { prefixesTesting } = require('./../config/testing.json').prefixes;


// Gets a list of valid prefixes
// Arguments: a database object as defined in database/db.js
// Return: array of objects {value, seperator}
const getPrefixes = (database, testing) => {
	const prefixesDefault = testing ? prefixesTesting : prefixesBot;
	console.log(prefixesBot);
	console.log(prefixesTesting);
	console.log(prefixesDefault);
	return prefixesDefault;
};

// Checks if a string starts with a prefix format.
// Arguments: a message string, a an array of prefix objects {value, seperator}k
// Returns: an a prefixed-message object {prefix, args}
const getPrefixedMessage = (message, prefixes) => {
	const prefix = prefixes.map(elem => elem.value + elem.seperator).find(elem => message.startsWith(elem));
	return { prefix: prefix, args: message.substring(prefix.length).split(/ +/) };
};

module.exports = { getPrefixes, getPrefixedMessage };