const express = require("express");
const db = require("../db.js");
const path = require("path");
const router = express.Router();
const s3 = require("../s3.js");
const multer = require("multer");
const uidSafe = require("uid-safe");

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, callback) {
        uidSafe(24).then((uid) => {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //2MB
    },
});
router.get("/app.json", (req, res) => {
    db.getUsers(req.session.userId)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.post(
    "/uploader.json",
    uploader.single("file"),
    s3.s3Uploader,
    (request, response) => {
        if (!request.file) {
            response.sendStatus(500);
        }
        const url =
            "https://spicedling.s3.amazonaws.com/" + request.file.filename;
        db.addImageInUsersTable(url, request.session.userId)
            .then((result) => {
                if (result) {
                    response.json(url);
                }
            })
            .catch((e) => {
                console.log(e);
                response.sendStatus(500);
            });
    }
);

router.post("/bioEditor.json", (req, res) => {
    const { bio } = req.body;
    db.addBio(bio, req.session.userId)
        .then((update) => {
            res.json(update.rowCountt);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.get("/findPeople.json/find", (req, res) => {
    db.findPeople(req.query.after)
        .then((peoples) => {
            res.json(peoples.rows);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.get("/findPeople.json/more", (req, res) => {
    db.findMorePeople(req.query.id, req.query.val)
        .then((peoples) => {
            res.json(peoples.rows);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(500);
        });
});

router.get("/userProfile/:id.json", (req, res) => {
    if (req.params.id === `${req.session.userId}`) {
        return res.json({ sameId: true });
    }

    db.getUsers(req.params.id)
        .then((results) => {
            res.json(results.rows[0]);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});

router.get("/friendshipstatus/:id.json", (req, res) => {
    if (req.params.id === `${req.session.userId}`) {
        return res.sendStatus(500);
    }
    db.getFriendships(req.params.id, req.session.userId)
        .then((results) => {
            console.log("Get Frindships", results.rowCount);
            if (results.rowCount === 0) {
                return res.json(results.rowCount);
            } else {
                console.log(results.rows[0]);
                return res.json(results.rows[0]);
            }
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});

router.post("/send-friend-request/:id.json", (req, res) => {
    db.addFriendships(req.session.userId, req.params.id)
        .then((results) => {
            console.log(results.rowCount);
            res.json(results.rowCount);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});

router.post("/accept-friend-request/:id.json", (req, res) => {
    db.updateFriendships(req.session.userId, req.params.id)
        .then((results) => {
            console.log(results.rowCount);
            res.json(results.rowCount);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});

router.post("/end-friendship/:id.json", (req, res) => {
    db.deleteFriendships(req.session.userId, req.params.id)
        .then((results) => {
            res.json(results.rowCount);
        })
        .catch((e) => {
            console.log(e);
            res.sendStatus(404);
        });
});
module.exports = router;
