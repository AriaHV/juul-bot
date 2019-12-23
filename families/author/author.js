module.exports = {
	name: 'author',
	aliases: [],
	description: 'Commands for use by the bot author.',

	execute: async (message, args) => {
		const family = message.client.families[args.shift().toLowerCase].commands;
		const input = args.shift().toLowerCase();

		const command =
			family.find(x => x.name && x.name === input)
			|| family.find(x => x.aliases && x.aliases.includes(input));
		if (!command) return false;

		try {
			await command.execute(message, args);
			return true;
		}
		catch (error) {
			console.error(error);
		}

		return false;
	},

	valid: async (message, args) => {
		return isAuthor(message);
	},
};

const isAuthor = (message) => {
	return message.author.id.equals('296715612149776384');
};