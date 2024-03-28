const express = require("express");
const accountRoutes = express.Router();
const fs = require('fs');

const dataPath = './account.json';

// util functions 

const saveAccountData = (data) => {
    fs.writeFile(dataPath, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log('Account data saved successfully');
    });
};

const getAccountData = (callback) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, JSON.parse(data));
    });
};

// Middleware for parsing JSON request body
accountRoutes.use(express.json());

// Read - get all accounts from the JSON file
accountRoutes.get('/account', (req, res) => {
    getAccountData((err, accounts) => {
        if (err) {
            res.status(500).send('Error reading account data');
            return;
        }
        res.send(accounts);
    });
});

// Add a new account
accountRoutes.post('/account/addaccount', (req, res) => {
    getAccountData((err, existAccounts) => {
        if (err) {
            res.status(500).send('Error reading account data');
            return;
        }
        
        const newAccountId = Math.floor(100000 + Math.random() * 900000);
        existAccounts[newAccountId] = req.body;

        saveAccountData(existAccounts);
        res.send({ success: true, msg: 'Account data added successfully' });
    });
});

// Update an existing account
accountRoutes.put('/account/:id', (req, res) => {
    getAccountData((err, existAccounts) => {
        if (err) {
            res.status(500).send('Error reading account data');
            return;
        }
        
        const accountId = req.params.id;
        existAccounts[accountId] = req.body;

        saveAccountData(existAccounts);
        res.send(`Account with id ${accountId} has been updated`);
    });
});

// Delete an account
accountRoutes.delete('/account/delete/:id', (req, res) => {
    getAccountData((err, existAccounts) => {
        if (err) {
            res.status(500).send('Error reading account data');
            return;
        }
        
        const accountId = req.params.id;
        delete existAccounts[accountId];

        saveAccountData(existAccounts);
        res.send(`Account with id ${accountId} has been deleted`);
    });
});

module.exports = accountRoutes;
