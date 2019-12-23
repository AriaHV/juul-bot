module.exports = {
	name: 'general',
	aliases: [],
	description: 'A family of general purpose functionality that does not have a more specific family.',

	execute: async (message, args) => {
		const family = args.shift();
		const input = args.shift().toLowerCase();

		console.log(family);
		const command =
			family.commands.find(x => x.name && x.name.equals(input))
			|| family.commands.find(x => x.aliases && x.aliases.includes(input));
		if (!command) return;

		try {
			await command.execute(message, args);
		}
		catch (error) {
			console.error(error);
		}
	},
};