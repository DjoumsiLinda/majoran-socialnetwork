-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/messages.sql
-- heroku pg:psql -f server/tables/messages.sql

DROP TABLE IF EXISTS messages;

CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   message VARCHAR NOT NULL CHECK (message != ''),
   users_id INT REFERENCES users(id) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );
 
INSERT INTO messages (message, users_id) VALUES (
    'hey, i new here',
    13
);

INSERT INTO messages (message, users_id) VALUES (
    'hey, i new here',
    170
);
INSERT INTO messages (message, users_id) VALUES (
    'hello, I am happy to use this web',
    2
);
INSERT INTO messages (message, users_id) VALUES (
    'cool site web',
    5
);
INSERT INTO messages (message, users_id) VALUES (
    'not bad',
    46
);
INSERT INTO messages (message, users_id) VALUES (
    'i dont find it cool. i want to delete my account. how can i do it?',
    8
);

INSERT INTO messages (message, users_id) VALUES (
    'cool',
    15
);

INSERT INTO messages (message, users_id) VALUES (
    'i like the styling.',
    25
);

INSERT INTO messages (message, users_id) VALUES (
    'i think you can do bether. you must to work to the styling.',
    55
);

INSERT INTO messages (message, users_id) VALUES (
    'hey, i new here',
    100
);

INSERT INTO messages (message, users_id) VALUES (
    'hey, i new here',
    150
);

