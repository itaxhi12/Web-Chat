/** @format */

const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    pfp: {
      data: Buffer,
      contentType: String,
      required: false,
    },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("users", userSchema);

router.post("/register", (req, res) => {
  let { username, password } = req.body;
  password = bcrypt.hashSync(password, 10);
  try {
    model.create({ username: username, password: password });
    return res.status(200).json({ message: "user created" });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const User = await model.findOne({ username: username }).lean();
  if (!User) {
    return res
      .status(401)
      .send({ status: "error", error: "Invalid username or password" });
  }
  if (await bcrypt.compare(password, User.password)) {
    const token = jwt.sign(User, process.env.jwtkey);
    res.status(200).send({
      jwt: token,
      user: {
        username: User.username,
        name: User.name,
        pfp: User.pfp,
      },
    });
  } else {
    res.status(401);
    res.json({ error: "Invalid username or password" });
  }
});

router.put("/changepass/:username", async (req, res) => {
  const { oldpass, newpass } = req.body;
  const { username } = req.params;
  const User = await model.findOne({ username: username }).lean();
  
  if (bcrypt.compareSync(oldpass, User.password)) {
    const pass = bcrypt.hashSync(newpass, 10);
    model.findByIdAndUpdate(
      { _id: User._id },
      { $set: { password: pass } },
      { new: true, useFindAndModify: false },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(200).json({ message: "password updated" });
        }
      }
    );
  } else {
    return res.status(401).json({ message: "Invalid Password" });
  }
});
module.exports = router;
