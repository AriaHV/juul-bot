const db = require('../database/blacklist');

const getProfileBlacklistString = (statuses, padding) => {
	const rows = statuses.map(status => {
		const s = getProfileBlacklistStatusStrings(status.status);
		return [s.prefix, `[${status.scope}]`, s.message];
	});
	console.log('[blacklist.getProfileBlacklistString]:  ' + rows);
	return getStringFromMatrix(rows, padding);
};

const getStringFromMatrix = (rows, padding) => {
	const n = rows[0].length;
	const max = Math.max(rows.map(row => Math.max(row.map(entry => entry.length))));
	rows = rows.map(row => row.map(entry => entry.padEnd(max, ' ')).join(' '.repeat(padding)));
	return rows.join('\n');
};

const paddedStringRow = (row, max) => {
	console.log('[blacklist.getProfileBlacklistString]:  ' + max);
	console.log('[blacklist.getProfileBlacklistString]:  ' + row);
	for (let i = 0; i < row.length; i++) row[i] = row[i] + ' '.repeat(max[i] - row[i].length);
	return row;
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