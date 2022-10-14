const path = require("path");
const db = require('./db/index.js');

exports.sampleRoute = (req, res) => {
  res.sendStatus(200);
};

exports.catchAll = (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/index.html"));
};

exports.getConversations = async (req, res) => {
  try {
    const userImage = await db.getUserImage(req.body._id);
    res.json({ userImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
