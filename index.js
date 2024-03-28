// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const dataPath = './account.json';

// Helper function to read data from the JSON file
const readData = () => {
    try {
        const jsonData = fs.readFileSync(dataPath);
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading data file:', error);
        return [];
    }
};

// Helper function to write data to the JSON file
const writeData = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
};

// Function to generate auto-incremented ID
const generateId = () => {
    const users = readData();
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    return maxId + 1;
};

// Create a new user
app.post('/account', (req, res) => {
    const users = readData();
    const newId = generateId();
    const newUser = { ...req.body, id: newId };
    users.push(newUser);
    writeData(users);
    res.status(201).send(newUser);
});

// Read all users
app.get('/account', (req, res) => {
    const users = readData();
    res.send(users);
});

// Update a user by ID
app.put('/account/:id', (req, res) => {
    const users = readData();
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.status(404).send({ error: 'User not found' });
    } else {
        users[index] = { ...users[index], ...req.body };
        writeData(users);
        res.send(users[index]);
    }
});

// Delete a user by ID
app.delete('/account/:id', (req, res) => {
    const users = readData();
    const { id } = req.params;
    const index = users.findIndex(user => user.id === parseInt(id));
    if (index === -1) {
        res.status(404).send({ error: 'User not found' });
    } else {
        const deletedUser = users.splice(index, 1)[0];
        writeData(users);
        res.send(deletedUser);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
