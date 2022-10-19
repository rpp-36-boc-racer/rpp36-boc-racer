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
    // console.log(`this is conversation involving ${userID}`, conversation);
    console.log("conversations", conversation);
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
          sort: { updatedAt: -1 },
        }
      );

      return {
        conversationId,
        friendId,
        username,
        profileImage,
        // eslint-disable-next-line no-nested-ternary
        text: lastMessage
          ? lastMessage.photoUrl
            ? "image"
            : lastMessage.text
          : "",
        time: lastMessage ? lastMessage.updatedAt : convo.updatedAt,
        epochTime: Date.parse(lastMessage && lastMessage.updatedAt),
        hasBeenRead: lastMessage.hasBeenRead,
      };
    });

    const unsortedConvos = await Promise.all(results);
    const sortedConvos = unsortedConvos.sort((a, b) => {
      return b.epochTime - a.epochTime;
    });
    console.log("sortedconvos", sortedConvos);
    res.status(200).send(sortedConvos);
  } catch (err) {
    console.log("err", err);
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
    console.log(savedMessage._id.toString());
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
  console.log("conversationid", convoId);
  try {
    await messagingModels.Conversation.findOneAndDelete({ id: convoId });
    res.status(200).send("successfully deleted conversation");
  } catch (err) {
    res.status(500).send(err);
  }
};

// exports.readMessageById = async (req, res) => {
//   const { messageId } = req.params;
//   try {
//     await messagingModels.TextMessage.
//   }
// }
