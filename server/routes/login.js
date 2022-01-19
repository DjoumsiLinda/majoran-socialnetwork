const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db.js");
const router = express.Router();

router.post("/login.json", (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.sendStatus(500);
    }
    db.getPassword(email)
        .then((results) => {
            let hashFromDb;
            if (results.rows[0] === undefined) {
                response.sendStatus(500);
            } else {
                hashFromDb = results.rows[0].password;
            }
            bcrypt.compare(password, hashFromDb).then((match) => {
                if (match) {
                    request.session.userId = results.rows[0].id;
                    response.json(results.rows[0].id);
                } else {
                    response.sendStatus(500);
                }
            });
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
        });
});
module.exports = router;
