// backend/routes/user.js
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'amrita_hospital'
});

// Route for user registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO user (username, password, created_at) VALUES (?, ?, NOW())';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Route for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length > 0) {
            res.json({ message: 'Login successful!', user: results[0] });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

module.exports = router;
