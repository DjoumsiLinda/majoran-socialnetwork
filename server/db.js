/*
-- https://bcrypt-generator.com/
-- sudo service postgresql start
-- createdb socialnetwork
-- psql -d socialnetwork -f server/tables/socialnetwork.sql
-- heroku pg:psql -f server/tables/socialnetwork.sql
*/
const spicedPg = require("spiced-pg");
//heroku
let connetionString = process.env.DATABASE_URL;
if (!connetionString) {
    connetionString = require("./secrets.json").connetionString;
}

const db = spicedPg(connetionString);
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Users table
module.exports.addUser = (first, last, email, password) => {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id;`,
        [first, last, email, password]
    );
};
module.exports.addImageInUsersTable = (url, id) => {
    return db.query(
        `UPDATE users
        SET url = $1 
        WHERE id=$2;`,
        [url, id]
    );
};
module.exports.getUsers = (id) => {
    return db.query(
        `SELECT id, first, last, email, url, bio FROM users where id = $1;`,
        [id]
    );
};

module.exports.findPeople = (val) => {
    return db.query(
        `SELECT id, first, last, url, (
            SELECT id AS lowestid FROM users WHERE first ILIKE $1 or last ILIKE $1 ORDER BY id ASC LIMIT 1
        ) FROM users WHERE first ILIKE $1 or last ILIKE $1 ORDER BY first ASC LIMIT 9;`,
        [val + "%"]
    );
};
module.exports.findMorePeople = (lastId, val) => {
    return db.query(
        `SELECT id, first, last, url, (
            SELECT id AS lowestid FROM users WHERE first ILIKE $1 or last ILIKE $1 ORDER BY id ASC LIMIT 1
        ) FROM users WHERE (first ILIKE $1 or last ILIKE $1) and id < $2 ORDER BY first ASC LIMIT 9;`,
        [val + "%", lastId]
    );
};
module.exports.getPassword = (email) => {
    return db.query(`SELECT id, password FROM users where email = $1;`, [
        email,
    ]);
};
module.exports.resetPassword = (password, email) => {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE email = $2;`,
        [password, email]
    );
};
module.exports.checkEmail = (email) => {
    return db.query(`SELECT id FROM users where email = $1;`, [email]);
};

module.exports.addBio = (bio, id) => {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2;`,
        [bio, id]
    );
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ reset_codes table
module.exports.addCode = (email, code, users_id) => {
    return db.query(
        `INSERT INTO reset_codes (email, code, users_id)
        VALUES($1, $2, $3)
        RETURNING id;`,
        [email, code, users_id]
    );
};
module.exports.getCode = (CodeId) => {
    return db.query(
        `SELECT code FROM reset_codes where id = $1 and CURRENT_TIMESTAMP - created_at < INTERVAL '1 minutes';`,
        [CodeId]
    );
};

module.exports.deleteCode = (id) => {
    return db.query(`delete from reset_codes where id=$1`, [id]);
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ friendships table
module.exports.getFriendships = (receiver_id, sender_id) => {
    return db.query(
        `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};

module.exports.addFriendships = (receiver_id, sender_id) => {
    return db.query(
        `INSERT INTO friendships (sender_id, receiver_id)
        VALUES($1, $2)
        RETURNING id;`,
        [receiver_id, sender_id]
    );
};

module.exports.updateFriendships = (receiver_id, sender_id) => {
    return db.query(
        `UPDATE friendships
        SET accepted = true
        WHERE(receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1);`,
        [receiver_id, sender_id]
    );
};
module.exports.deleteFriendships = (receiver_id, sender_id) => {
    return db.query(
        `delete from friendships WHERE(receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};

module.exports.getFriends = (id) => {
    return db.query(
        `SELECT * FROM friendships
		JOIN users
        ON (sender_id=users.id AND receiver_id=$1      AND accepted=false) -- WANNABES
        OR (sender_id=users.id AND receiver_id=$1      AND accepted=true)  -- Friend requests, that I accepted
        OR (sender_id=$1      AND receiver_id=users.id AND accepted=true);`,
        [id]
    );
};

module.exports.getOtherFriendsProfile = (id, aktId) => {
    return db.query(
        `SELECT * FROM friendships
		JOIN users
        ON (sender_id=users.id AND receiver_id=$1      AND accepted=true AND  sender_id != $2)
        OR (sender_id=$1      AND receiver_id=users.id AND accepted=true AND receiver_id != $2);`,
        [id, aktId]
    );
};
