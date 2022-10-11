// const db = require("./db");
// const auth = require("./auth");
const path = require("path");

exports.getMessages = (req, res) => {
  res.sendStatus(200);
};

exports.getChat = (req, res) => {
  res.sendStatus(200);
};

exports.catchAll = (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
};
