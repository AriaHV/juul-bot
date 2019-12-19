module.exports = {
	name: 'ping',
	aliases: ['-pp'],
	description: 'Sends a simple response. Used for debugging.',
	usages: ['ping'],

	async execute(message, args) {
		await message.channel.send('pong!');
	},
};