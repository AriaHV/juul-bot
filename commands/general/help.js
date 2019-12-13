const Discord = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
	name: 'help',
	aliases: ['-h'],
	description: 'Lists general commands and their description.',

	execute(message, args) {
		if (!args.length) {
			const embedAuthor = 'juul - a general purpose bot';
			const embedDescription = getEmbedDescription(message.client.commands['general']);

			const embed = new Discord.RichEmbed()
				.setColor(embedColor)
				.setDescription(embedDescription);

			message.channel.send(embed);
		}
	},
};

const getEmbedDescription = (collection) => {
	let embedDescription = '';
	for (const command of collection) {
		embedDescription +=
        '**\'j' + command[1].name + '**\n' +
        command[1].description + '\n\n';
	}
	embedDescription += 'check out my [github](https://github.com/AriaHV/juul-bot)';
	return embedDescription;
};