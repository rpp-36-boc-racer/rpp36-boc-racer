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
  friends: [{ type: String, default:null }]
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


exports.User = mongoose.model("users", userSchema);
exports.Message = mongoose.model("messages", messageSchema);