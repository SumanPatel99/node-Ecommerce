const express = require('express');
const router = express.Router();
const fs = require('fs');

// Helper function to read and write to JSON file
function readData() {
  const data = fs.readFileSync('data/users.json', 'utf8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync('data/users.json', JSON.stringify(data, null, 2));
}

// Signup Route
router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const users = readData();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const newUser = { id: users.length + 1, username, email, password };
  users.push(newUser);
  writeData(users);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData();
  
  // Check if user exists
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful', user });
});

module.exports = router;
