/* eslint-disable no-restricted-syntax */
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = require("express")();
const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const socket = require("socket.io");
const db = require("./db");
const auth = require("./auth");
const routes = require("./routes");
const instmsgRoutes = require("./messagingRoutes");
const friend = require("./friend");
// const socketHelper = require("./socketHelperFn");
const { upload } = require("../s3");

const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.post("/login", auth.login);
app.post("/signup", auth.signup);

app.get("/users/:username", friend.getUsers);
app.post("/friends", friend.addFriend);

app.post("/photo", auth.requireAuth, upload.single("image"), routes.photo);
app.post("/profileimage", auth.requireAuth, routes.setProfileImage);

app.post("/send-img", auth.requireAuth, instmsgRoutes.addMessage);

// app.get("/conversations", routes.getConversations);

/** ************************************************
 *          routes of instant messaging
 * ********************************************** */
app.post("/instmsg-api/conversations", instmsgRoutes.newConversation);
app.get(
  "/instmsg-api/conversations/:userID",
  instmsgRoutes.getConversationByUser
);
app.delete("/instmsg-api/conversations/:convoId",
instmsgRoutes.deleteConversationById);
// app.put("/instmsg-api/messages/:textMessageId", instmsgRoutes.readMessageById);
app.get("/instmsg-api/conversations/:userID/:friendID", instmsgRoutes.getChats);
app.post("/instmsg-api/messages/addmsg", instmsgRoutes.addMessage);
app.get("/instmsg-api/messages/:conversationId", instmsgRoutes.getMessages);
app.get("/users-api/:userID", instmsgRoutes.getUser);

/** **** socket.io ******** */
global.onlineUsersObj = {};

const addUser = (userId, socketId) => {
  global.onlineUsersObj[userId] = socketId;
};

const getUser = (userId) => global.onlineUsersObj[userId];

const removeUser = (socketId) => {
  for (const key in global.onlineUsersObj) {
    if (global.onlineUsersObj[key] === socketId) {
      delete global.onlineUsersObj[key];
    }
  }
};

const io = socket(4000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user is connected! socketId is: ", socket.id);

  socket.on("add-user", (userId) => {
    console.log(
      "a user is added!",
      " userId: ",
      userId,
      "socketId: ",
      socket.id
    );
    addUser(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log(
      "send msg!",
      data,
      "sender:",
      data.senderId,
      "receiver: ",
      data.receiverId
    );
    const receiverSocket = getUser(data.receiverId);
    console.log("receiverSocket:", receiverSocket);
    socket.to(receiverSocket).emit("get-msg", {
      senderId: data.senderId,
      message: data.message,
    });
  });

  socket.on("read", async (data) => {
    console.log("read event data", data);
    const dbResp = await db.expireImage(data);
    console.log(dbResp);
    // can also do the hasBeenRead => true for all message from receiver

    // force refresh page of the receiver if read image AND receiver is still in instant message page
    const receiverSocket = getUser(data.receiverId);
    console.log("online users", global.onlineUsersObj);
    if (dbResp.modifiedCount && receiverSocket) {
      const delayRefresh = 5;
      setTimeout(() => {
        console.log("emited force refresh to", receiverSocket);
        socket.to(receiverSocket).emit("get-msg", {
          message: "123",
        });
      }, delayRefresh);
    }
  });

  socket.on("remove-user", (userId) => {
    const userSocket = getUser(userId);
    removeUser(userSocket);
    console.log("online users", global.onlineUsersObj);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!", socket.id);
    removeUser(socket.id);
  });
});
/******************************************************
 * ******************************************************/

// const connections = {};

// io.use((socket, next) => {
//   const handshakeData = socket.request;
//   // eslint-disable-next-line no-underscore-dangle
//   const { userId } = handshakeData._query;
//   connections[userId] = socket;
//   next();
// });

// io.on("connection", (socket) => {
//   socket.on("disconnect", () => {
//     // eslint-disable-next-line no-underscore-dangle
//     delete connections[socket.request._query.userId];
//   });

//   socket.on("new-message", async (data) => {
//     // const message = await db.saveMessage(data);
//     if (connections[data.friendId]) {
//       connections[data.friendId].emit("message", {
//         senderId: data.senderId,
//         message: data.message,
//       });
//     }
//   });
// });

app.get("*", routes.catchAll);
server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
