const db = require("./mongo");

exports.signup = async (newUser) => {
  const emailExists = await db.User.findOne({ email: newUser.email });
  if (emailExists) {
    throw Error("Email already in use");
  }
  const usernameExists = await db.User.findOne({ username: newUser.username });
  if (usernameExists) {
    throw Error("Username already in use");
  }
  const user = await db.User.create(newUser);
  user.password = undefined;
  return user;
};

exports.login = async (userData) => {
  const user = await db.User.findOne(userData);
  if (!user) {
    throw Error("Incorrect email");
  }
  return user;
};

exports.checkUserId = async (_id) => {
  const userId = await db.User.findOne({ _id }).select("_id");
  return userId;
};

exports.getUsers = async (info) => {
  const usersinfo = await db.User.find({
    username: { $regex: info },
  });

  if (!usersinfo) {
    throw Error("Can't find any user");
  }
  const users = usersinfo.map((user) => ({
    username: user.username,
    profileImage: user.profileImage,
  }));
  return users;
};

exports.addFriend = async (username, newfriend) => {
  const friends = await db.Friend.findOneAndUpdate(
    { username },
    { $addToSet: { friends: newfriend } },
    { upsert: true }
  );
};

exports.addMessage = () => {
  // addMessage
};
