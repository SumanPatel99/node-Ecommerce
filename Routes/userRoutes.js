// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', (req, res) => {
  const users = userController.getUsers();
  res.json(users);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userController.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Create a new user
router.post('/', (req, res) => {
  const newUser = userController.createUser(req.body);
  res.status(201).json(newUser);
});

// Update user by ID
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUserData = req.body;
  const success = userController.updateUser(userId, updatedUserData);
  if (success) {
    res.json({ message: 'User updated successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete user by ID
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const success = userController.deleteUser(userId);
  if (success) {
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
