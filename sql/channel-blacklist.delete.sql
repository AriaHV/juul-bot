DELETE
FROM channel_blacklist
WHERE user_id = $1 AND channel_id = $2;