-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f tables/socialnetwork.sql
-- heroku pg:psql -f tables/socialnetwork.sql

DROP TABLE IF EXISTS users;


CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR NOT NULL CHECK (first != ''),
      last VARCHAR NOT NULL CHECK (last != ''),
      email VARCHAR NOT NULL UNIQUE CHECK (email != ''),
      password VARCHAR NOT NULL CHECK (password != ''),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first, last, email, password) VALUES (
    'usertest',
    'usertest',
    'usertest@yahoo',
    '123'
);