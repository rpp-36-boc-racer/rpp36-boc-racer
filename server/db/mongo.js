const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paw-print", () => {
  // eslint-disable-next-line no-console
  console.log("Connected to DB");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  profileImage: { type: String, default: null },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, require: true },
});

const messageSchema = new mongoose.Schema(
  {
    userId: String,
    friendId: String,
    message: String,
    photoUrl: String,
    expireAt: { type: Date, index: true, expireAfterSeconds: 0 },
  },
  { timestamps: true }
);

const friendSchema = new mongoose.Schema({
  userId: String,
  friendId: String,
});

exports.User = mongoose.model("User", userSchema);
exports.Message = mongoose.model("Message", messageSchema);
exports.Friend = mongoose.model("Friend", friendSchema);
