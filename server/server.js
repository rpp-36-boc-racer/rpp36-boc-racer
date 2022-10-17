const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = require("express")();
// const socket = require("socket.io");
const auth = require("./auth");
const routes = require("./routes");
const instmsgRoutes = require("./messagingRoutes");
// const socketHelper = require("./socketHelperFn");
const { upload } = require("../s3");
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.post("/login", auth.login);
app.post("/signup", auth.signup);

app.post("/photo", auth.requireAuth, upload.single("image"), routes.photo);
app.post("/profileimage", auth.requireAuth, routes.setProfileImage);

app.post("/send-img", auth.requireAuth, routes.sendImage);

// app.get("/conversations", routes.getConversations);

/** ************************************************
 *          routes of instant messaging
 * ********************************************** */
app.post("/instmsg-api/conversations", instmsgRoutes.newConversation);
app.get(
  "/instmsg-api/conversations/:userID",
  instmsgRoutes.getConversationByUser
);
app.get("/instmsg-api/conversations/:userID/:friendID", instmsgRoutes.getChats);
app.post("/instmsg-api/messages/addmsg", instmsgRoutes.addMessage);
app.get("/instmsg-api/messages/:conversationId", instmsgRoutes.getMessages);
app.get("/users-api/:userID", instmsgRoutes.getUser);

app.get("*", routes.catchAll);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});

/** **** socket.io ******** */
// const io = socket(8080, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("a user is connected!", socket.id);

//   socket.on("add-user", (userId) => {
//     console.log("a user is added!", userId, socket.id);
//     socketHelper.addUser(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     console.log("send msg!", data.senderId, data.receiverId);
//     const sendUserSocket = socketHelper.getUser(data.receiverId);
//     // const sendUserSocket = socketHelper.getUser("63459dfbed755a985aad36fb");
//     console.log("sendUserSocket:", sendUserSocket);
//     io.to(sendUserSocket).emit("get-msg", data.senderId, data.message);
//     // data.emit("get-msg", data.senderId, data.message);
//   });
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!", socket.id);
//     socketHelper.removeUser();
//   });
// });
