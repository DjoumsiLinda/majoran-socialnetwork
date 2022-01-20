const express = require("express");
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");
const db = require("../db.js");
const router = express.Router();
const ses = require("../ses.js");

router.post("/resetPassword/start.json", (request, response) => {
    const { email } = request.body;
    if (!email) {
        response.sendStatus(500);
    }
    db.checkEmail(email)
        .then((resId) => {
            if (resId.rows[0].id) {
                //code to user senden
                const secretCode = cryptoRandomString({
                    length: 6,
                });
                db.addCode(email, secretCode, resId.rows[0].id)
                    .then((codeId) => {
                        const text = "Reset Your Password";
                        const subject = `Here is the code: ${secretCode} to reset your Password. Please give this code in Linda~Fashion`;
                        ses.sendEmail(email, text, subject)
                            .then((sendEmailerg) => {
                                if (sendEmailerg === "ok") {
                                    return response.json(codeId.rows[0].id);
                                }
                                response.sendStatus(500);
                            })
                            .catch((err) => {
                                console.log(err);
                                response.sendStatus(500);
                            });
                    })
                    .catch((err) => {
                        console.log(err);
                        response.sendStatus(500);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            response.sendStatus(500);
        });
});

router.post("/resetPassword/verify.json", (request, response) => {
    const { codeId, email, code, password } = request.body;
    if (!email || !code || !password || !codeId) {
        response.sendStatus(500);
    }
    db.getCode(codeId)
        .then((codeErg) => {
            if (codeErg) {
                if (codeErg.rows[0].code === code) {
                    bcrypt.hash(password, 12).then((digest) => {
                        db.resetPassword(digest, email)
                            .then((result) => {
                                response.json(result);
                            })
                            .catch((err) => {
                                console.log(err);
                                response.sendStatus(500);
                            });
                    });
                }
            }
        })
        .catch(() => {
            response.json({ expiration: "true" });
        });
});
router.post("/resetPassword/success.json", (request, response) => {
    const { codeId } = request.body;
    if (!codeId) {
        response.sendStatus(500);
    }
    db.deleteCode(codeId)
        .then((codeErg) => {
            if (codeErg) {
                response.json(codeErg.rowCount);
            }
        })
        .catch(() => {
            response.sendStatus(500);
        });
});
module.exports = router;
