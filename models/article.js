const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name can not be empty'],
    unique: true
  },
  price: {
    type: Number,
    min: [0, 'you can not add a negative number'],
    required: [true, 'price can not be empty'],
  },
  image: {
    type: String,
    required: [true, "image can not be empty"],
  } 
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;