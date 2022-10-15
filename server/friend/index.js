const db = require("../db");

exports.getUsers = async (req, res) => {
  try {
    const users = await db.getUsers(req.params.username);
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFriend = async (req, res) => {
  try {
    const user = req.body.user.username;
    const newfriend = req.body.newfriend;
    const friend = await db.addFriend(user, newfriend);
    const friend2 = await db.addFriend(newfriend, user);
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};