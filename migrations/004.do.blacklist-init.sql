CREATE TABLE global_blacklist (
	user_id 	character (16) PRIMARY KEY
);

CREATE TABLE guild_blacklist (
	user_id 	character(16) NOT NULL,
	guild_id 	character(16) NOT NULL, 
	CONSTRAINT guild_blacklist_key PRIMARY KEY (user_id, guild_id),
	blacklisted boolean
);

CREATE TABLE channel_blacklist (
	user_id 	character(16) NOT NULL,
	guild_id 	character(16) NOT NULL, 
	channel_id	character(16) NOT NULL,
	CONSTRAINT channel_blacklist_key PRIMARY KEY (user_id, guild_id, channel_id),
	blacklisted boolean
);