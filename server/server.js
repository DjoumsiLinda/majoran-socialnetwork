//https://reactjs.org/docs/create-a-new-react-app.html
const express = require("express");
const server = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");
const registration = require("./routes/registration.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ cookieSession
// sessionSecret für heroku
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    sessionSecret = require("./secrets.json").sessionSecret;
}
server.use(
    cookieSession({
        secret: sessionSecret,
        sameSite: true, // prevents Cross Site Request Forgery (CSRF) attacks
    })
);

server.use((req, res, next) => {
    console.log("📢", req.method, req.url, req.session);
    next();
});
server.use(express.json());
server.use(compression());

server.use(express.static(path.join(__dirname, "..", "client", "public")));

server.use(registration);
server.get("/user/id.json", (req, res) => {
    if (req.session) {
        res.json({ userId: req.session.userId });
    }
    res.json({ userId: undefined });
});
server.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. http://localhost:3000");
});
