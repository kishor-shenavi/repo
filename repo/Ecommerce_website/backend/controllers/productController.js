const Product = require('../models/Product');

// @desc    Get all products (with optional pagination)
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

// @desc    Search products by name/description
// @route   GET /api/products/search?query=
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ success: false, message: 'Search query is required' });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search failed' });
  }
};

// @desc    Filter products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category}$`, 'i') },
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to filter products' });
  }
};

module.exports = { getAllProducts, getProductById, searchProducts, getProductsByCategory };






/* Fix 1 — Add the missing functions to productController.js
Add these three functions at the bottom, before module.exports:
js// @desc    Create a new product
// @route   POST /api/products
// @access  Private (admin)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    const product = await Product.create({ name, description, price, category, image, stock });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (admin)
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
};
Then update the module.exports line:
jsmodule.exports = {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  createProduct,   // ← add these
  updateProduct,
  deleteProduct,
};

Fix 2 — Register the routes in routes/products.js
jsconst {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
  createProduct,   // ← add these imports
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect } = require('../middleware/auth'); // already exists

// existing GET routes stay as-is ...

// POST /api/products  — create
router.post('/', protect, createProduct);

// PUT /api/products/:id  — update
router.put('/:id', protect, updateProduct);

// DELETE /api/products/:id  — delete
router.delete('/:id', protect, deleteProduct);
*/