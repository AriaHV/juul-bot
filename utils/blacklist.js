const { BlacklistStatus } = require('../database/blacklist');

const getProfileBlacklistString = (scope, status) => {
	const s = getProfileBlacklistStatusStrings(status);
	return [s.prefix, `[${scope}]:\t\t`, s.message].join(' ');
};

const getProfileBlacklistStatusStrings = (status) => {
	switch (status) {
	case BlacklistStatus.blacklist:
		return { prefix: '-', message: 'blacklisted' };
	case BlacklistStatus.whitelist:
		return { prefix: '+', message: 'whitelisted' };
	case BlacklistStatus.inherit:
		return { prefix: '*', message: 'inherit' };
	default:
		return { prefix: '-', message: 'invalid' };
	}
};

module.exports = { getProfileBlacklistString };