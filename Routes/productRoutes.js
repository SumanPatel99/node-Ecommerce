// productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;



// Request URL
// GET /api/products/123

// Request URL
// GET /api/products?category=electronics

// Request Body
// POST /api/products
// {
//   "name": "Product Name",
//   "price": 99.99
// }