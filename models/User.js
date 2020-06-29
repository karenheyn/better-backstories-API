const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  mailingList: {
    type: Boolean,
  },
  pdfPaid: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
