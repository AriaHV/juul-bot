module.exports = {
	name: 'general',
	aliases: [],
	description: 'A family of general purpose functionality that does not have a more specific family.',

	execute: async (message, args) => {
		console.log(args);
		const family = message.client.families['general'].commands;
		const input = args.shift().toLowerCase();

		const command =
			family.find(x => x.name && x.name === input)
			|| family.find(x => x.aliases && x.aliases.includes(input));
		if (!command) return false;

		try {
			console.log(command);
			await command.execute(message, args);
			return true;
		}
		catch (error) {
			console.error(error);
		}

		return false;
	},
};