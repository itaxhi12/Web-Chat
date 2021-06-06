require("dotenv").config();
const express = require("express");
const app = express();
const text = require("./Models/message");
const user = require("./Routes/users");
const group = require("./Routes/conversations");
const messages = require("./Routes/message");
const texts = require("./Models/message");

const mongoose = require("mongoose");

const cors = require("cors");

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.listen(process.env.port, () => console.log("listening"));
mongoose.connect("mongodb://localhost:27017/chat", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/uploads", express.static("uploads"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(user, group, messages);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "HELLO" });
});

io.on("connection", (socket) => {
  socket.on("new message", async (text) => {
    try {
      const savedMessage = await texts.create(text);
      io.emit("newmessage", savedMessage);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("getmessages", async (chatid) => {
    try {
      const chats = await texts.find({ chatid: chatid });
      io.emit("messages", chats);
    } catch (e) {
      console.log(e);
    }
  });
});
