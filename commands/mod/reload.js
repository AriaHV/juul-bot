module.exports = {
	name: 'reload',
	aliases: ['-r'],
	description: 'Reloads a command',

	async execute(message, args) {
		if (!args.length) return await message.channel.send(`You didn't pass any command to reload, ${message.author}!`);

		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return await message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

		delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			const newCommand = require(`./${commandName}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		}
		catch (error) {
			return await message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
		}
		await message.channel.send(`Command \`${commandName}\` was reloaded!`);
	},
};