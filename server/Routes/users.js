const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const jwt = require("jsonwebtoken");
const convo = require("../Models/conversations");
const model = require("../Models/users");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `./uploads/`;
    fs.mkdirSync(path, { recursive: true });
    return cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post("/register", async (req, res) => {
  let { username, password, status, name } = req.body;
  password = bcrypt.hashSync(password, 10);
  try {
    model.create({
      username: username,
      password: password,
      name: name,
      status: status,
    });

    try {
      const user = await model.find({}, (err, data) => {
        return data;
      });
      const newUser = await model.findOne({ username: username });
      const participants = [newUser.id];
      user.map((e) => {
        const participants = [newUser.id, e.id];

        if (e.id !== newUser.id) {
          try {
            convo.create({ participants: participants });
          } catch (e) {
            console.log(e);
          }
        }
      });
    } catch (e) {
      console.log(e);
    }

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
    res.status(200).json({
      jwt: token,
      user: {
        id: User._id,
        username: User.username,
        name: User.name,
        status: User.status,
        pfp: User.pfp,
      },
    });
  } else {
    res.status(401);
    res.json({ error: "Invalid username or password" });
  }
});
router.put("/changepfp/:username", upload.single("pfp"), async (req, res) => {
  const { username } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      console.log(req.file);
      const user = await model.findOne({ username: username }).lean();
      model.findByIdAndUpdate(
        { _id: user._id },
        { $set: { pfp: req.file.path } },
        { new: true, useFindAndModify: false },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const User = await model.findOne({ username: username }).lean();

            const token = jwt.sign(User, process.env.jwtkey);
            res.status(200).json({
              jwt: token,
              user: {
                id: User._id,
                username: User.username,
                name: User.name,
                status: User.status,
                pfp: User.pfp,
              },
            });
          }
        }
      );
    } else {
      return res.status(401).json({ message: "User Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "User Unauthorized" });
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

router.put("/changename/:username", async (req, res) => {
  const { name } = req.body;
  const { username } = req.params;
  const Authorization = req.header("Authorization");

  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      const user = await model.findOne({ username: username }).lean();
      model.findByIdAndUpdate(
        { _id: user._id },
        { $set: { name: name } },
        { new: true, useFindAndModify: false },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const User = await model.findOne({ username: username }).lean();
            const token = jwt.sign(User, process.env.jwtkey);
            res.status(200).json({
              jwt: token,
              user: {
                id: User._id,
                username: User.username,
                name: User.name,
                status: User.status,
                pfp: User.pfp,
              },
            });
          }
        }
      );
    } else {
      res.status(401).json({ message: "User Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "User Unauthorized" });
  }
});

router.put("/changestatus/:username", async (req, res) => {
  const { status } = req.body;
  const { username } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      const user = await model.findOne({ username: username }).lean();
      model.findByIdAndUpdate(
        { _id: user._id },
        { $set: { status: status } },
        { new: true, useFindAndModify: false },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const User = await model.findOne({ username: username }).lean();

            const token = jwt.sign(User, process.env.jwtkey);
            res.status(200).json({
              jwt: token,
              user: {
                id: User._id,
                username: User.username,
                name: User.name,
                status: User.status,
                pfp: User.pfp,
              },
            });
          }
        }
      );
    } else {
      return res.status(401).json({ message: "User Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "User Unauthorized" });
  }
});

router.get("/user/:userid", async (req, res) => {
  const { userid } = req.params;
  const Authorization = req.header("Authorization");
  if (Authorization) {
    if (jwt.verify(Authorization, process.env.jwtkey)) {
      try {
        const user = await model.findOne({ _id: userid });
        res.status(200).json({
          username: user.username,
          name: user.name,
          status: user.status,
          pfp: user.pfp,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return res.status(401).json({ message: "User Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "User Unauthorized" });
  }
});

module.exports = router;
