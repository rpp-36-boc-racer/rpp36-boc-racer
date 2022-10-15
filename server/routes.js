const path = require("path");
const db = require('./db/index.js');

exports.sampleRoute = (req, res) => {
  res.sendStatus(200);
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


