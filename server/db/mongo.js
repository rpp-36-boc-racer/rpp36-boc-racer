const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paw-print", () => {
  // eslint-disable-next-line no-console
  console.log("Connected to DB");
});

const userSchema = new mongoose.Schema({
  userName: String,
  location: String,
});

const messageSchema = new mongoose.Schema({
  body: String,
  photoUrl: String,
  expireAt: { type: Date, index: true, expireAfterSeconds: 0 },
});

exports.User = mongoose.model("User", userSchema);
exports.Message = mongoose.model("Message", messageSchema);
