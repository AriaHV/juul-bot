module.exports = {
	name: 'mod',
	aliases: [],
	description: 'Commands for guild moderation.',

	execute: async (message, args) => {
		return;
	},

	valid: async (message, args) => {
		return isAuthor(message);
	},
};

const isAuthor = (message) => {
	return message.author.id.equals('296715612149776384');
};