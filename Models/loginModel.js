const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  newPassword: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
});
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
