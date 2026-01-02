const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    images: { type: [String], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
