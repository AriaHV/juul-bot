module.exports = {
	name: 'ping',
	aliases: [],
	description: 'A simple ping-pong command for bot debugging. [author-version]',

	async execute(message, args) {
		await message.channel.send('pong! [author-version]');
	},
};