const messagingModels = require("./db/instantMessagingModels");
const userModel = require("./db/mongo");

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
  try {
    const conversation = await messagingModels.Conversation.find({
      members: { $in: [req.params.userID] },
    });
    console.log(
      `this is conversation involving ${req.params.userID}`,
      conversation
    );
    res.status(200).send(conversation);
  } catch (err) {
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
