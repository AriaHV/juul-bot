const Discord = require('discord.js');
const { prefixes, embedColor } = require('../../config.json');

module.exports = {
	name: 'help',
	aliases: ['-h'],
	description: 'Lists general commands and their description.',

	async execute(message, args) {
		if (!args.length) {
			const embedAuthor = 'juul - a general purpose bot';
			const embedDescription = getEmbedDescription(message.client.commands['general']);

			const embed = new Discord.RichEmbed()
				.setColor(embedColor)
				.setDescription(embedDescription);

			await message.channel.send(embed);
		}
	},
};

const getEmbedDescription = (collection) => {
	let embedDescription = '';
	for (const command of collection) {
		embedDescription +=
		'**' + command[1].name + '**: ' + command[1].description + '\n' +
		'```' + prefixes[0] + ' ' + command[1].name + '```\n\n';
	}
	embedDescription += 'check out my [github](https://github.com/AriaHV/juul-bot)';
	return embedDescription;
};

// const getEmbedDescription = async (message, collection, args) => {
// 	const localExcluded = await message.client.database.isGuildExcluded(message.author, message.guild);
// 	const globalExcluded = await message.client.database.isExcluded(message.author);

// 	const s = 	`${message.author.username}'s profile summary\n\n` +
// 				'blacklisted scopes```' +
// 				`[global]: ${globalExcluded}` +
// 				`[server]: ${globalExcluded}` +
// 				`[channel]: not implemented yet` +
// 				'```' +
// };

