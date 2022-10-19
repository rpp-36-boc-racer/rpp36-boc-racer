const mongoose = require("mongoose");

// temporarily using 10s for testing purposes
const imageExpireIn = 10;

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const textMessageSchema = new mongoose.Schema(
  {
    conversationID: { type: String },
    senderID: { type: String },
    text: { type: String },
    photoUrl: { type: String },
    hasBeenRead: { type: Boolean, default: false },
    imageReadAt: { type: Date, expires: imageExpireIn },
  },
  { timestamps: true }
);

exports.Conversation = mongoose.model("Conversation", ConversationSchema);
exports.TextMessage = mongoose.model("TextMessage", textMessageSchema);
