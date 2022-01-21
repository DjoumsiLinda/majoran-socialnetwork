/*
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
        `SELECT first, last, email, url, bio FROM users where id = $1;`,
        [id]
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

module.exports.addBio = (bio, id) => {
    return db.query(
        `UPDATE users
        SET bio = $1
        WHERE id = $2;`,
        [bio, id]
    );
};
