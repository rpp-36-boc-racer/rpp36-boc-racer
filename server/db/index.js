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
  const userId = await db.User.findOne({ _id }).select("_id");
  return userId;
};

exports.setProfileImage = async (_id, url) => {
  const user = await db.User.findOne({ _id });
  user.profileImage = url;
  await user.save();
  user.password = undefined;
  return user;
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
    friends: user.friends,
  }));
  return users;
};

exports.getFriends = async (info) => {
  const friendsinfo = await db.User.find({
    _id: info,
  });

  if (!friendsinfo) {
    throw Error("Can't find any friends");
  }
  return friendsinfo[0].friends.sort();
};

exports.addFriend = async (username, newfriend) => {
  await db.User.findOneAndUpdate(
    { username },
    { $addToSet: { friends: newfriend } },
    { upsert: true }
  );
};

exports.setProfileImage = async (_id, url) => {
  const user = await db.User.findOne({ _id });
  user.profileImage = url;
  await user.save();
  user.password = undefined;
  return user;
};

exports.getUserInfo = async (_id) => {
  const userInfo = await db.User.findOne({ _id });
  return userInfo;
};

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

  return messageDb.TextMessage.updateMany(filter, update);
};

exports.readMessage = async (queryParam) => {
  const { conversationId, receiverId } = queryParam;
  const receiverIdRegex = new RegExp(receiverId);
  const filter = {
    senderID: { $not: receiverIdRegex },
    conversationID: conversationId,
  };
  const update = {
    $set: {
      hasBeenRead: true,
    },
  };
  return messageDb.TextMessage.updateMany(filter, update);
};
