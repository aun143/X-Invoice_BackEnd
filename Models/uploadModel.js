const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  file: {
    type: String,
    required: false,
  },
});

const upload = mongoose.model("UploadFiles", imageSchema);

module.exports = upload;
