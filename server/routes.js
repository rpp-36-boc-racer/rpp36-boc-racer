const path = require("path");
const db = require('./db/index.js');
const { uploadFile } = require("../s3");
const db = require("./db");

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
  // add image url to db

  // temperarily setting as below
  res.status(200).json(req.body);
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


