//https://reactjs.org/docs/create-a-new-react-app.html
const express = require("express");
const server = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const path = require("path");
const registration = require("./routes/registration.js");
const login = require("./routes/login.js");
const resetPassword = require("./routes/resetPassword.js");
const app = require("./routes/app.js");
const db = require("./db.js");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ cookieSession
// sessionSecret für heroku
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    sessionSecret = require("./secrets.json").SESSION_SECRET;
}
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    sameSite: true, // prevents Cross Site Request Forgery (CSRF) attacks
});
server.use((req, res, next) => {
    console.log("📢", req.method, req.url, req.session);
    next();
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ websocket
const http = require("http");
const { Server } = require("socket.io");
const websocket = http.createServer(server);
const io = new Server(websocket);

server.use(cookieSessionMiddleware);
server.use(express.json());
server.use(compression());

server.use(express.static(path.join(__dirname, "..", "client", "public")));

server.use(registration);
server.use(login);
server.use(resetPassword);
server.use(app);

// make session object available in socket connection
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

server.get("/user/id.json", (req, res) => {
    if (req.session) {
        res.json({ userId: req.session.userId });
    } else {
        res.json({ userId: undefined });
    }
});
server.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

const listUsers = [];
io.on("connection", (socket) => {
    //console.log("new user connected", socket.id);
    console.log("session", socket.request.session);

    // stopping unauthenticated users from
    // getting access to our chat messages
    if (!socket.request.session.userId) {
        // `true` prevents the client from trying to reconnect
        return socket.disconnect(true);
    }
    listUsers.push(socket.request.session.userId);

    db.getLastChatMessages().then((result) => {
        socket.emit("chatMessages", result.rows.reverse());
    });

    socket.on("chatMessage", (text) => {
        db.addMessages(text, socket.request.session.userId).then((update) => {
            if (update.rows[0]) {
                db.getUsers(socket.request.session.userId).then((results) => {
                    const obj = {
                        created_at: update.rows[0].created_at,
                        first: results.rows[0].first,
                        id: update.rows[0].id,
                        last: results.rows[0].last,
                        message: text,
                        url: results.rows[0].url,
                        users_id: socket.request.session.userId,
                    };
                    io.emit("chatMessage", obj);
                });
            }
        });
    });
    let uniquelistUsers = listUsers.filter((c, index) => {
        return listUsers.indexOf(c) === index;
    });
    io.emit("connected-users", uniquelistUsers);
    socket.on("disconnect", () => {
        io.emit(
            "disconnected-users",
            socket.request.session.userId,
            uniquelistUsers
        );
    });
});

websocket.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening. http://localhost:3000");
});
