const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

exports.Conversation = mongoose.model("Conversation", ConversationSchema);
exports.TextMessage = mongoose.model("TextMessage", textMessageSchema);
