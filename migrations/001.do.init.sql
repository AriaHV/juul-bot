CREATE TABLE user_exclusions (
	user_id character (16) PRIMARY KEY
	);
	
CREATE TABLE user_guild_exclusions (
	user_id character(16) NOT NULL,
	guild_id character(16) NOT NULL,
	CONSTRAINT user_guild_key PRIMARY KEY (user_id, guild_id)
	);

CREATE TABLE response_command_entries (
	entry_id serial PRIMARY KEY,
	command_name varchar(32),
	embed_image TEXT,
	embed_description TEXT
	);


	
