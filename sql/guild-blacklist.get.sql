SELECT *
FROM guild_blacklist
WHERE user_id = $1 AND guild_id = $2;