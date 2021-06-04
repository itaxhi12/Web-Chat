const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const model = require("../Models/message");
router.get("/messages/:chatid", async (req, res) => {
  const { chatid } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      try {
        const chats = await model.find({ chatid: chatid });
        res.status(200).json(chats);
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

router.post("/message", async (req, res) => {
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      const Message = new model(req.body);
      try {
        const savedMessage = await Message.save();
        res.status(200).json({ message: savedMessage });
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

module.exports = router;
