const { RichEmbed, Client, Channel, Message } = require('discord.js');

module.exports = {
	name: 'delete',
	aliases: ['-d'],
	type: 'mod',
	description: 'Deletes a message',

	execute(message, args) {
		// const nArgs = 1;
		// if(args.length != nArgs) {
		// 	message.reply('incorrect amount of arguments for this command.');
		// 	return;
		// }

		message.channel.fetchMessage(args[0])
			.then(msg => {
				const deleteContent = msg.content;
				const deleteAuthor = msg.author;
				const deleteModerator = message.author;
				let deleteOffence = 'default';
				let deleteAction = 'nothing';

				if(args.length == 3) {
					deleteOffence = args[1];
					deleteAction = args[2];
				}

				message.channel.send(
					'author:\t\t' + deleteAuthor + '\n' +
                    'moderator:\t\t' + deleteModerator + '\n' +
                    'offence:\t\t' + deleteOffence + '\n' +
                    'action:\t\t' + deleteAction + '\n' +
                    '```' +
                    deleteContent +
                    '```',
				);

				msg.delete();
				message.delete();
			})
			.catch(console.error);


	},
};