module.exports = {
	name: 'ping',
	aliases: ['-pp'],
	type: 'mod',
	description: 'A simple ping-pong command for bot debugging. [mod-version]',

	execute(message, args) {
		message.channel.send('pong! [mod-version]');
	},
};