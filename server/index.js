/** @format */

require("dotenv").config();
const express = require("express");
const app = express();

const user = require("./users");
const group = require("./conversations").router;
const messages = require("./message");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(user,group,messages);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "HELLO" });
});
