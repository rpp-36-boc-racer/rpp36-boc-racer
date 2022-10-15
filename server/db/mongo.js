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

// const messageSchema = new mongoose.Schema({
//   message: String,
//   photoUrl: String,
//   expireAt: { type: Date, index: true, expireAfterSeconds: 0 },
// });

<<<<<<< HEAD
exports.User = mongoose.model("User", userSchema);
// exports.Message = mongoose.model("Message", messageSchema);
=======
const friendSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  friends: [{ type: String }],
});

exports.User = mongoose.model("users", userSchema);
exports.Message = mongoose.model("messages", messageSchema);
exports.Friend = mongoose.model("friends", friendSchema);
>>>>>>> 55b34e423c9d24f7160cc99d40784a32563051e7
