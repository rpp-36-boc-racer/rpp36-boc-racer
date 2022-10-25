const path = require("path");
// const db = require('./db/index.js');
const { uploadFile } = require("../s3");
const db = require("./db");
const messagingModels = require("./db/instantMessagingModels");

exports.photo = (req, res) => {
  uploadFile(req.file)
    .then((apiRes) => {
      res.json({ url: apiRes.Location });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

exports.setProfileImage = async (req, res) => {
  try {
    const { _id, url } = req.body;
    const user = await db.setProfileImage(_id, url);
    res.status(201).json(user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

exports.sendImage = async (req, res) => {
  console.log(req.body);
  const newMessage = new messagingModels.TextMessage({
    conversationID: req.body.conversationId,
    senderID: req.body.userId,
    text: req.body.text,
    photoUrl: req.body.imageURL,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.friendSearch = async (req, res) => {
  console.log(req.body);
  const people = await db.searchFriends(req.body.term);
  res.json(people);
};

exports.addFriend = async (req, res) => {
  try {
    const friendship = await db.addFriend(req.body);
    res.status(201).json(friendship);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

exports.getFriends = async (req, res) => {
  try {
    const friends = await db.getFriends(req.user._id);
    res.json(friends);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await db.getConversations(req.query.userId);
    res.json(conversations);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await db.getMessages(req.query.userId, req.query.friendId);
    res.json(messages);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

exports.catchAll = (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
};

// exports.getConversations = async (req, res) => {
//   try {
//     const userInfo = await db.getUserInfo(req.body._id);
//     res.json({ userInfo });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
