const db = require('../database/blacklist');

const getProfileBlacklistString = (scope, status) => {
	const s = getProfileBlacklistStatusStrings(status);
	return [s.prefix, `[${scope}]:\t\t`, s.message].join(' ');
};

const allowResponseCommands = async (database, users, guild, channel) => {
	const result = await Promise.all(users.map(user => allowResponseCommandsForUser(database, user, guild, channel)));
	return !result.includes(false);
};

const allowResponseCommandsForUser = async (database, user, guild, channel) => {
	const globalStatus = await db.getGlobalBlacklisted(database, user);
	const guildStatus = await db.getGuildBlacklistStatus(database, user, guild);
	const channelStatus = await db.getChannelBlacklistStatus(database, user, channel);

	let allow = (globalStatus == db.BlacklistStatus.whitelist) ? true : false;

	// Overwrite on guild scope
	if (guildStatus == db.BlacklistStatus.whitelist) allow = true;
	else if (guildStatus == db.BlacklistStatus.blacklist) allow = false;

	// Overwrite on channel scope
	if (channelStatus == db.BlacklistStatus.whitelist) allow = true;
	else if (guildStatus == db.BlacklistStatus.blacklist) allow = false;

	return allow;
};

const isBlacklistStatus = (status) => {
	return [db.BlacklistStatus.blacklist, db.BlacklistStatus.inherit, db.BlacklistStatus.whitelist].includes(status);
};

const getProfileBlacklistStatusStrings = (status) => {
	switch (status) {
	case db.BlacklistStatus.blacklist:
		return { prefix: '-', message: 'blacklisted' };
	case db.BlacklistStatus.whitelist:
		return { prefix: '+', message: 'whitelisted' };
	case db.BlacklistStatus.inherit:
		return { prefix: '*', message: 'inherit' };
	default:
		return { prefix: '-', message: 'invalid' };
	}
};

module.exports = { getProfileBlacklistString, isBlacklistStatus, allowResponseCommands };