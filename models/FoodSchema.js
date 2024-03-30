const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  dish: {
    type: String,
    required: true,
    lowercase: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  unit: {
    type: String,
    required: true,
    lowercase: true,
  },
  unitPrice: {
    type: Number,
    required: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("food", foodSchema);
