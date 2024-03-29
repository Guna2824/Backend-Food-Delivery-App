const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema({
  city: String,
  kmPrice: Number,
});

module.exports = mongoose.model("zone", zoneSchema);
