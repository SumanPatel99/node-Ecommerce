const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Routes/authRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const userRoutes = require('./Routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

app.use(bodyParser.json());

// Payment Routes
app.use('/api/payments', paymentRoutes);

// Product Routes
app.use('/api/products', productRoutes);
// Order Routes
app.use('/api/orders', orderRoutes);
// User Routes
app.use('/api/users', userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
