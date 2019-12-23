const { Database, normaliseId } = require('./db');
const { queries } = require('./db');

const queryString = (database, name) => database.queries[name];

const getResponseEntries = async (database, name) => {
	return database.query(queryString(database, 'response-command-entries.get'), [name]);
};

module.exports = { getResponseEntries };