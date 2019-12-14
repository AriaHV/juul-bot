SELECT *
FROM user_exclusions
WHERE user_id IN ($1);