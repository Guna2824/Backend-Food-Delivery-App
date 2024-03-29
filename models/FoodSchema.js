const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  dish: String,
  type: String,
  unit: String,
  unitPrice: Number,
});

module.exports = mongoose.model("food", foodSchema);
