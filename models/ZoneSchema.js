const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  kmPrice: {
    type: Number,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("zone", zoneSchema);
