// Required modules
const express = require('express');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load user data from JSON file
const userDataPath = './data/users.json';
let userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

// JWT secret key
const secretKey = 'your_secret_key';

// Routes

// Register a new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    if (userData.users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Add user to the data
    userData.users.push({ username, password: hashedPassword });

    // Update JSON file
    fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = userData.users.find(user => user.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
