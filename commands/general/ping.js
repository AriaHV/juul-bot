module.exports = {
	name: 'ping',
	aliases: ['-pp'],
	description: 'A simple ping-pong command for bot debugging.',

	async execute(message, args) {
		await message.channel.send('pong!');
	},
};