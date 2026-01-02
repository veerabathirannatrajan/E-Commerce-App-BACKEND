const Product = require('../models/product.model');

// GET ALL PRODUCTS + FILTERS
exports.getProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.brand)
      filters.brand = { $regex: req.query.brand, $options: 'i' };

    if (req.query.name)
      filters.name = { $regex: req.query.name, $options: 'i' };

    if (req.query.rating)
      filters.rating = Number(req.query.rating);

    if (req.query.minPrice || req.query.maxPrice) {
      filters.price = {};
      if (req.query.minPrice)
        filters.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice)
        filters.price.$lte = Number(req.query.maxPrice);
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE PRODUCT (PUT / PATCH)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch {
    res.status(400).json({ message: 'Invalid data or ID' });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
