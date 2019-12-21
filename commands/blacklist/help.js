const Discord = require('discord.js');
const { embedColor } = require('../../config.json');
const { getHelpHeaderString, getCommandsHelpString } = require('../../utils/help');

module.exports = {
	name: 'help',
	aliases: ['-h'],
	description: 'Lists help information.',
	usages: ['blacklist help'],

	async execute(message, args) {
		if (!args.length) {
			const embedDescription = getEmbedDescription(message.client.commands['blacklist']);

			const embed = new Discord.RichEmbed()
				.setColor(embedColor)
				.setDescription(embedDescription);

			await message.channel.send(embed);
		}
	},
};

const getEmbedDescription = (collection) => {
	return [getHelpHeaderString(), getCommandsHelpString(collection)].join('\n\n');
};