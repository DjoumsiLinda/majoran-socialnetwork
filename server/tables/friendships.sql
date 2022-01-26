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

 