DROP TABLE channel_blacklist;
CREATE TABLE channel_blacklist (
	user_id 	character(16) NOT NULL, 
	channel_id	character(16) NOT NULL,
	CONSTRAINT channel_blacklist_key PRIMARY KEY (user_id, channel_id),
	blacklisted boolean
);