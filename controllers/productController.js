// productController.js
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  const data = fs.readFileSync(productsFilePath, 'utf8');
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

module.exports = {
  getProducts: (req, res) => {
    const products = readProducts();
    res.json(products);
  },

  getProductById: (req, res) => {
    const productId = req.params.id;
    const products = readProducts();
    const product = products.find(product => product.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  },

  createProduct: (req, res) => {
    const { name, price } = req.body;
    const products = readProducts();
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  },

  updateProduct: (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
    const products = readProducts();
    const productIndex = products.findIndex(product => product.id === parseInt(productId));
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    products[productIndex] = { id: parseInt(productId), name, price };
    writeProducts(products);
    res.json({ message: 'Product updated successfully', product: products[productIndex] });
  },

  deleteProduct: (req, res) => {
    const productId = req.params.id;
    const products = readProducts();
    const filteredProducts = products.filter(product => product.id !== parseInt(productId));
    if (products.length === filteredProducts.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    writeProducts(filteredProducts);
    res.json({ message: 'Product deleted successfully' });
  }
};
