const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = require("express")();
const auth = require("./auth");
const routes = require("./routes");
const db = require("./db");
const friend = require('./friend')

const { upload } = require("../s3");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);
const PORT = process.env.PORT || 3000;
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.post("/login", auth.login);
app.post("/signup", auth.signup);


app.get("/users/:username", friend.getUsers);
app.post("/friends", friend.addFriend);
// routes that require authentication use auth.requireAuth middleware
app.get("/sample-route", auth.requireAuth, routes.sampleRoute);

app.post("/photo", auth.requireAuth, upload.single("image"), routes.photo);
app.post("/profileimage", auth.requireAuth, routes.setProfileImage);

app.post("/send-img", auth.requireAuth, routes.sendImage);


app.get("*", routes.catchAll);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
