const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatid: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: { currenttime: () => Date.now() } },
  { collection: "messages" }
);

const model = mongoose.model("messages", MessageSchema);

module.exports = model;