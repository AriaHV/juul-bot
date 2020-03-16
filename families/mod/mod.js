module.exports = {
	name: 'mod',
	aliases: [],
	description: 'Commands for guild moderation.',

	execute: async (message, args) => {
		// Return if the message author is not a moderator
		if (!isModerator(message)) return;
	},

	valid: async (message, args) => {
		return isModerator(message);
	},
};

const isModerator = (message) => {
	return message.member.hasPermission('MANAGE_GUILD');
};