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
