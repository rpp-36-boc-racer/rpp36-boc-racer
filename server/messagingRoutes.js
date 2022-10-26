const messagingModels = require("./db/instantMessagingModels");
const userModel = require("./db/mongo");
const { getUserInfo } = require("./db/index.js");
// post new conversation:
// endpoint: "/instmsg-api/conversations"
exports.newConversation = async (req, res) => {
  const newConversation = new messagingModels.Conversation({
    members: [req.body.senderID, req.body.receiverID],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).send(savedConversation);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get conversation of an user:
// endpoint: "/instmsg-api/conversations/:userID"
exports.getConversationByUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const conversation = await messagingModels.Conversation.find({
      members: { $in: [userID] },
    });
    const results = conversation.map(async (convo) => {
      const conversationId = convo.id;

      const friendId =
        userID === convo.members[0] ? convo.members[1] : convo.members[0];
      const userInfo = await getUserInfo(friendId);

      const { username, profileImage } = userInfo;
      const lastMessage = await messagingModels.TextMessage.findOne(
        {
          conversationID: conversationId,
        },
        [],
        {
          sort: { createdAt: -1 },
        }
      );
      return {
        conversationId,
        userID,
        friendId,
        username,
        profileImage,
        // eslint-disable-next-line no-nested-ternary
        text: lastMessage
          ? lastMessage.photoUrl
            ? "image"
            : lastMessage.text
          : "",
        time: lastMessage ? lastMessage.createdAt : convo.createdAt,
        epochTime: Date.parse(lastMessage && lastMessage.createdAt),
        hasBeenRead: lastMessage ? lastMessage.hasBeenRead : false,
        senderId: lastMessage ? lastMessage.senderID : friendId,
        lastMessageId: lastMessage ? lastMessage._id : null,
      };
    });

    const unsortedConvos = await Promise.all(results);
    const sortedConvos = unsortedConvos.sort((a, b) => {
      return b.epochTime - a.epochTime;
    });
    res.status(200).send(sortedConvos);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get conversation between user and a friend:
// endpoint: "/instmsg-api/conversations/:userID/:friendID"
exports.getChats = async (req, res) => {
  try {
    const chats = await messagingModels.Conversation.findOne({
      members: { $all: [req.params.userID, req.params.friendID] },
    });
    res.status(200).send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
};

// post new message:
// endpoint: "/instmsg-api/messages/addmsg"

exports.addMessage = async (req, res) => {
  const newMessage = new messagingModels.TextMessage({
    conversationID: req.body.conversationID,
    senderID: req.body.senderID,
    text: req.body.text,
    photoUrl: req.body.photoUrl,
    hasBeenRead: false,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).send(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get message by conversation id:
// endpoint: "/instmsg-api/messages/:conversationId"
exports.getMessages = async (req, res) => {
  try {
    const messages = await messagingModels.TextMessage.find({
      conversationID: req.params.conversationId,
    });
    res.status(200).send(messages);
  } catch (err) {
    res.status(500).send(err);
  }
};

// get user by id
// endpoint: "/users/:userID"
exports.getUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await userModel.User.findById(userID);
    const userData = {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      username: user.username,
      profileImage: user.profileImage,
    };
    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteConversationById = async (req, res) => {
  const { convoId } = req.params;
  // console.log("conversationid", convoId);
  try {
    await messagingModels.Conversation.findOneAndDelete({ _id: convoId });
    res.status(200).send("successfully deleted conversation");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.readMessageById = async (req, res) => {
  const { textMessageId } = req.params;
  try {
    await messagingModels.TextMessage.findOneAndUpdate(
      { _id: textMessageId },
      { $set: { hasBeenRead: true } }
    );
    res.status(201).send("updated hasBeenRead status");
  } catch (err) {
    res.status(500).send(err);
  }
};
