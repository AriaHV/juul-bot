module.exports = {
	name: 'ping',
	aliases: [],
	description: 'Sends a simple response. Used for debugging.',
	usages: ['ping'],

	async execute(message, args) {
		await message.channel.send('pong!');
	},
};