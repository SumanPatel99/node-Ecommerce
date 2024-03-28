// controllers/orderController.js
const fs = require('fs');

const ordersFilePath = 'data/orders.json';

function readOrders() {
  const data = fs.readFileSync(ordersFilePath, 'utf8');
  return JSON.parse(data);
}

function writeOrders(orders) {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
}

exports.getAllOrders = (req, res) => {
  const orders = readOrders();
  res.json(orders);
};

exports.getOrderById = (req, res) => {
  const orders = readOrders();
  const order = orders.find(order => order.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

exports.createOrder = (req, res) => {
  const orders = readOrders();
  const newOrder = req.body;
  newOrder.id = orders.length + 1;
  orders.push(newOrder);
  writeOrders(orders);
  res.status(201).json({ message: 'Order created successfully', order: newOrder });
};

exports.updateOrder = (req, res) => {
  const orders = readOrders();
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex(order => order.id === orderId);
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  orders[index] = { ...orders[index], ...req.body };
  writeOrders(orders);
  res.json({ message: 'Order updated successfully', order: orders[index] });
};

exports.deleteOrder = (req, res) => {
  const orders = readOrders();
  const orderId = parseInt(req.params.id);
  const index = orders.findIndex(order => order.id === orderId);
  if (index === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }
  const deletedOrder = orders.splice(index, 1)[0];
  writeOrders(orders);
  res.json({ message: 'Order deleted successfully', order: deletedOrder });
};
