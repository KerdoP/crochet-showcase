const mongoose = require('mongoose');

const crochetItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageURL: String
});

module.exports = mongoose.model('CrochetItem', crochetItemSchema);
