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
    // NEVER EVER use the string interpolation in template literals
    // to construct your SQL queries.
    // Always use the built-in $1, $2... syntax
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id;`,
        [first, last, email, password]
    );
};
module.exports.getPassword = (email) => {
    return db.query(`SELECT id, password FROM users where email = $1;`, [
        email,
    ]);
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
    return db.query(`SELECT code FROM reset_codes where id = $1;`, [CodeId]);
};

module.exports.resetPassword = (password, email) => {
    return db.query(
        `UPDATE users
        SET password = $1
        WHERE email = $2 and CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';`,
        [password, email]
    );
};
