const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const auth = require("./auth");
const routes = require("./routes");
const { upload } = require("../s3");
const db = require("./db");

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.post("/login", auth.login);
app.post("/signup", auth.signup);

app.post("/photo", auth.requireAuth, upload.single("image"), routes.photo);
app.post("/profileimage", auth.requireAuth, routes.setProfileImage);

app.post("/send-img", auth.requireAuth, routes.sendImage);

app.post("/friend-search", auth.requireAuth, routes.friendSearch);
app.post("/add-friend", auth.requireAuth, routes.addFriend);
app.get("/get-friends", auth.requireAuth, routes.getFriends);

app.get("/conversations", auth.requireAuth, routes.getConversations);

app.get("/messages", auth.requireAuth, routes.getMessages);

const connections = {};

io.use((socket, next) => {
  const handshakeData = socket.request;
  // eslint-disable-next-line no-underscore-dangle
  const { userId } = handshakeData._query;
  connections[userId] = socket;
  next();
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    // eslint-disable-next-line no-underscore-dangle
    delete connections[socket.request._query.userId];
  });

  socket.on("new-message", async (data) => {
    const message = await db.saveMessage(data);
    if (connections[data.friendId]) {
      connections[data.friendId].emit("message", message);
    }
  });
});

app.get("*", routes.catchAll);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
