const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  newPassword: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  individualProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessProfile",
    required: false,
    default: null,
  },
  organizationProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessProfile",
    required: false,
    default: null,
  },
});
const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
