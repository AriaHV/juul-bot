const Discord = require('discord.js');
const { embedColor } = require('../../config.json');

module.exports = {
	name: 'hug',
	aliases: [],
	type: 'response',
	description: 'A hug command to hug another user. How nice!',

	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to hug them!');
		}

		// TODO: refactor
		let mentions = '';
		message.mentions.users.map(user => mentions += user.username + ', ');
		mentions = mentions.substring(0, mentions.length - 2);

		const author = message.author.username;

		// TODO: Get a random entry from the database
		const responseUrl = 'https://safebooru.org//images/1911/df5565531e5d92fd1861a77586e436835e1cb46d.gif?1993130';
		const responseDescription = `**${mentions}**. You've been hugged by ${author}`;

		const embed = new Discord.RichEmbed()
			.setColor(embedColor)
			.setImage(responseUrl)
			.setDescription(responseDescription);

		message.channel.send(embed);
	},
};