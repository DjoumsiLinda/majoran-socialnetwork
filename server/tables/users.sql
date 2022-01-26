-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/users.sql
-- heroku pg:psql -f server/tables/users.sql
DROP TABLE IF EXISTS friendships;
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

INSERT INTO users (first, last, email, password, url) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull+coronaVirus@spicedling.email',
    '$2a$12$pTK3hJoLSGAznK40FIQqpO5m1Z6CbGV7qOikJw9s5W/42ESVmgjce',
    'https://spicedling.s3.amazonaws.com/BWVu6wHcKHRvQ5_13TEkLT74WUYEzs1h.jpeg'
);

INSERT INTO users (first, last, email, password) VALUES (
    'Corona',
    'Virus',
    'reminiscent.gull@spicedling.email',
    '$2a$12$wi/mE7K0T8Z.0bPCFRbUxu8l3fIZTTcaakoa6uIiWjtGS/1.caRyq'
); 