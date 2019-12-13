DELETE
FROM user_guild_exclusions
WHERE user_id = $1 AND guild_id = $2;