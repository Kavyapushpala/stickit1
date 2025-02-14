const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User ", required: true },
  title: { type: String, required: true },
  passkey: { type: String, required: true },
});

module.exports = mongoose.model("Board", BoardSchema);