const dbconfig = require('./dbconfig.json');
const { readdirSync, readFileSync, openSync } = require('fs');
const { Pool } = require('pg');

const loadQueries = () => {
	const dir = readdirSync('./sql', 'utf8');
	const queries = {};
	for (const file of dir) {
		if (file.endsWith('.sql')) {
			queries[file.substring(0, file.length - '.sql'.length)] = readFileSync(openSync('./sql/' + file), 'utf8');
		}
	}
	return queries;
};

const normaliseId = (id) => parseInt(id).toString(16);

class Database {
	constructor() {
		this.db = new Pool(dbconfig);
		this.queries = loadQueries();
	}

	async isExcluded(user) {
		const queryString = this.queries['user-exclusion.get'];
		const result = await this.db.query(queryString, [normaliseId(user.id)]);
		return result.rows.length > 0;
	}

	async isGuildExcluded(user, guild) {
		const queryString = this.queries['user-guild-exclusion.get'];
		const result = await this.db.query(queryString, [normaliseId(user.id), normaliseId(guild.id)]);
		return result.rows.length > 0;
	}

	async isAnyExcluded(user, guild) {
		const excluded = await this.isExcluded(user);
		const guildExcluded = await this.isGuildExcluded(user, guild);
		console.log('global: ' + excluded);
		console.log('local: ' + guildExcluded);
		return excluded || guildExcluded;
	}

	registerExclusion(user) {
		const queryString = this.queries['user-exclusion.add'];
		return this.db.query(queryString, [normaliseId(user.id)]);
	}

	registerGuildExclusion(user, guild) {
		const queryString = this.queries['user-guild-exclusion.add'];
		return this.db.query(queryString, [normaliseId(user.id), normaliseId(guild.id)]);
	}

	unregisterExclusion(user) {
		const queryString = this.queries['user-exclusion.delete'];
		return this.db.query(queryString, [normaliseId(user.id)]);
	}

	unregisterGuildExclusion(user, guild) {
		const queryString = this.queries['user-guild-exclusion.delete'];
		return this.db.query(queryString, [normaliseId(user.id), normaliseId(guild.id)]);
	}
}

module.exports = { Database };