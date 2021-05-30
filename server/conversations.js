const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

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





router.get("/groups/:userid", async (req, res) => {
  const { userid } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      try {
        let conversation = await model.find({
          participants: { $in: [userid] },
        });
        conversation.map((convo) => {
          let index = convo.participants.findIndex((c) => c === userid);
          convo.participants.splice(index, 1);
        });
        res.status(200).json(conversation);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } else {
    return res.status(401).json({ message: "User Unauthorized" });
  }
});





module.exports = { router, model };
