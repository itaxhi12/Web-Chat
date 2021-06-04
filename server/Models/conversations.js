const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    participants: {
      type: [],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { collection: "chats" }
);

const model = mongoose.model("groups", conversationSchema);

module.exports = model;
