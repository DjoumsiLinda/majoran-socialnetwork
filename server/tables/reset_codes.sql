-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/reset_codes.sql
-- heroku pg:psql -f tables/reset_codes.sql
DROP TABLE IF EXISTS reset_codes;

-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ reset_codes tables
CREATE TABLE reset_codes(
      id SERIAL PRIMARY KEY,
      email VARCHAR NOT NULL CHECK (email != ''),
      code VARCHAR NOT NULL CHECK (code != ''),
      users_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);