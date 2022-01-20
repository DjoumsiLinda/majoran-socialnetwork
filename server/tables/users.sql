-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/users.sql
-- heroku pg:psql -f tables/users.sql
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS users;

-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ users tables
CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR NOT NULL CHECK (first != ''),
      last VARCHAR NOT NULL CHECK (last != ''),
      email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
      password VARCHAR NOT NULL CHECK (password != ''),
      url VARCHAR ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first, last, email, password) VALUES (
    'usertest',
    'usertest',
    'usertest@yahoo',
    '123'
);