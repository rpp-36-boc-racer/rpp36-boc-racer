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

exports.saveMessage = async (messageData) => {
  const message = await db.Message.create(messageData);
  return message;
};

exports.getConversations = async (_id) => {
  const obj = {};
  const results = await db.Message.find({
    $or: [{ userId: _id }, { friendId: _id }],
  }).sort({ createdAt: -1 });
  results.forEach((result) => {
    if (!obj[result.friendId]) {
      obj[result.friendId] = result;
    }
  });
  const keys = Object.keys(obj);
  const messages = [];
  keys.forEach((key) => {
    messages.push(obj[key]);
  });
  const conversations = await Promise.all(
    messages.map((message) =>
      db.User.findOne({ _id: message.friendId }).then((user) => ({
        message: message.message,
        createdAt: message.createdAt,
        friend: {
          username: user.username,
          _id: user._id,
          profileImage: user.profileImage,
        },
      }))
    )
  );
  return conversations;
};

exports.getMessages = async (userId, friendId) => {
  const messages1 = await db.Message.find({ userId, friendId });
  const messages2 = await db.Message.find({
    userId: friendId,
    friendId: userId,
  });
  const messages = [];
  messages1.forEach((message) => {
    messages.push(message);
  });
  messages2.forEach((message) => {
    messages.push(message);
  });
  // console.log("Messages from me", messages2);
  messages.sort((a, b) => {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    return 1;
  });
  const friend = await db.User.findOne({ _id: friendId });
  return messages.map((message) => {
    if (message.friendId !== userId) {
      return {
        message: message.message,
        createdAt: message.createdAt,
        username: friend.username,
        profileImage: friend.profileImage,
        friendId: friend._id,
        _id: message._id,
      };
    }
    return {
      message: message.message,
      createdAt: message.createdAt,
      _id: message._id,
      username: "Me",
    };
  });
};

exports.getUserInfo = async (_id) => {
  const userInfo = await db.User.findOne({ _id });
  return userInfo;
};