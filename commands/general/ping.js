module.exports = {
	name: 'ping',
	aliases: ['-pp'],
	description: 'A simple ping-pong command for bot debugging.',

	execute(message, args) {
		message.channel.send('pong!');
	},
};