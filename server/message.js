const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const MessageSchema = new mongoose.Schema(
  {
    chatid: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "messages" }
);

const model = mongoose.model("messagemModel", MessageSchema);

router.get("/messages/:chatid", async (req, res) => {
  const { chatid } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      try {
          const chats = await model.find({ chatid: chatid });
        res.status(200).json({ chats });
          
      } catch (e) {
        console.log(e);
      }
    } else {
      res.status(401).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "User Unauthorized" });
  }
});


router.post("/message", (req, res) => {
    
})



module.exports = router;
