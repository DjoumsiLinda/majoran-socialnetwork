/*
-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/users_bio.sql
-- heroku pg:psql -f server/tables/users_bio.sql
*/
ALTER TABLE users ADD COLUMN bio TEXT;