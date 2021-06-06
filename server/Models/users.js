const mongoose = require("mongoose");
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
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
  }
);

const model = mongoose.model("users", userSchema);

module.exports = model;
