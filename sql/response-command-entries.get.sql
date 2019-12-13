SELECT * 
FROM response_command_entries
WHERE command_name = LOWER($1);