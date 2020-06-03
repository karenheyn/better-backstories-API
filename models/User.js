const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    Type: String,
    required: true,
    unique: true,
  },
  password: {
    Type: String,
    required: true,
  },
  interest: {
    Type: String,
  },
  date: {
    Type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
