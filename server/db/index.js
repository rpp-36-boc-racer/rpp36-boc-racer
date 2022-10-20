const db = require("./mongo");
const messageDb = require("./instantMessagingModels");

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
  const userId = await db.User.findOne({ _id }).select("_id username");
  return userId;
};

exports.setProfileImage = async (_id, url) => {
  const user = await db.User.findOne({ _id });
  user.profileImage = url;
  await user.save();
  user.password = undefined;
  return user;
};

exports.addFriend = async (username, newfriend) => {
  const friends = await db.Friend.findOneAndUpdate(
    { username },
    { $addToSet: { friends: newfriend } },
    { upsert: true }
  );
};

exports.getUserInfo = async (_id) => {
  const userInfo = await db.User.findOne({ _id });
  return userInfo;
};

// expires image db model
exports.expireImage = async (queryParam) => {
  const { conversationId, receiverId, readAt } = queryParam;
  const receiverIdRegex = new RegExp(receiverId);
  const filter = {
    senderID: { $not: receiverIdRegex },
    conversationID: conversationId,
    photoUrl: { $exists: true, $not: /undefined/ },
  };
  const update = {
    $set: {
      imageReadAt: readAt,
      hasBeenRead: true,
    },
  };

  const response = await messageDb.TextMessage.updateMany(filter, update);
  return response;
};
