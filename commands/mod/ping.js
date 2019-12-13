module.exports = {
	name: 'ping',
	aliases: ['-pp'],
	description: 'A simple ping-pong command for bot debugging. [mod-version]',

	execute(message, args) {
		message.channel.send('pong! [mod-version]');
	},
};