SELECT *
FROM user_guild_exclusions
WHERE user_id IN ($1) AND guild_id = $2;