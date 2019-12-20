const { Database, normaliseId } = require('./db');
const { queries } = require('./db').queries();

const BlacklistStatus = Object.freeze({ blacklist:0, inherit: 1, whitelist: 2 });

const getGlobalBlacklisted = async (database, user) => {
	const result = await database.query(queries['global-blacklist.get'], [normaliseId(user.id)]);
	return (result.rows.length > 0) ? BlacklistStatus.blacklist : BlacklistStatus.whitelist;
};

const setGlobalBlacklisted = (database, user, blacklisted) => {
	const query = (blacklisted ? queries['global-blacklist.add'] : queries['global-blacklist.delete']);
	return database.query(query, [normaliseId(user.id)]);
};

const getGuildBlacklistStatus = async (database, user, guild) => {
	const result = await database.query(
		queries['guild-blacklist.get'],
		[normaliseId(user.id), normaliseId(guild.id)]);

	if (result.rows.length == 0) { return BlacklistStatus.inherit; }
	return (result.rows[0].blacklisted ? BlacklistStatus.blacklist : BlacklistStatus.whitelist);
};

const setGuildBlacklistStatus = (database, user, guild, status) => {
	if (status == BlacklistStatus.inherit) {
		return database.query(queries['guild-blacklist.delete'], [normaliseId(user.id), normaliseId(guild.id)]);
	}
	else {
		if (!(status == BlacklistStatus.blacklist || BlacklistStatus.whitelist)) {

			return null;
		}

		const args = [normaliseId(user.id), normaliseId(guild.id), (status == BlacklistStatus.blacklist)];
		return database.query(queries['guild-blacklist.add'], args);
	}
};

const getChannelBlacklistStatus = async (database, user, channel) => {
	const result = await database.query(
		queries['channel-blacklist.get'],
		[normaliseId(user.id), normaliseId(channel.id)]);

	if (result.rows.length == 0) { return BlacklistStatus.inherit; }
	return (result.rows[0].blacklisted ? BlacklistStatus.blacklist : BlacklistStatus.whitelist);
};

const setChannelBlacklistStatus = (database, user, channel, status) => {
	if (status == BlacklistStatus.inherit) {
		return database.query(queries['channel-blacklist.delete'],
			[normaliseId(user.id), normaliseId(channel.id)]);
	}
	else {
		if (!(status == BlacklistStatus.blacklist || BlacklistStatus.whitelist)) {
			return null;
		}

		const args = [normaliseId(user.id), normaliseId(channel.id), (status == BlacklistStatus.blacklist)];
		return database.query(queries['channel-blacklist.add'], args);
	}
};

module.exports = {
	BlacklistStatus,
	getGlobalBlacklisted,
	setGlobalBlacklisted,
	getGuildBlacklistStatus,
	setGuildBlacklistStatus,
	getChannelBlacklistStatus,
	setChannelBlacklistStatus,
};