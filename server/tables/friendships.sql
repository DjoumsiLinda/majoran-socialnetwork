-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/friendships.sql
-- heroku pg:psql -f server/tables/friendships.sql

DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   receiver_id INT REFERENCES users(id) NOT NULL,
   accepted BOOLEAN DEFAULT false,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );

INSERT INTO friendships (sender_id, receiver_id) VALUES (
    3,
    2
);
 
INSERT INTO friendships (sender_id, receiver_id) VALUES (
    3,
    4
);

INSERT INTO friendships (sender_id, receiver_id) VALUES (
    3,
    5
);

INSERT INTO friendships (sender_id, receiver_id) VALUES (
    20,
    3
);
INSERT INTO friendships (sender_id, receiver_id) VALUES (
    7,
    3
);
INSERT INTO friendships (sender_id, receiver_id) VALUES (
    8,
    3
);
INSERT INTO friendships (sender_id, receiver_id) VALUES (
    9,
    3
);

INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES (
    25,
    3,
    true
);

INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES (
    30,
    3,
    true
);

INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES (
    40,
    3,
    true
);

INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES (
    3,
    50,
    true
);

INSERT INTO friendships (sender_id, receiver_id, accepted) VALUES (
    3,
    60,
    true
);