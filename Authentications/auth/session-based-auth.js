const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('../config/env.config');
const fs = require('fs').promises;
const app = express();

const getUsers = async () => {
    const data = await fs.readFile('../data/users.data.json', 'utf8');
    return JSON.parse(data);
};

const saveUsers = async (users) => {
    await fs.writeFile('../data/users.data.json', JSON.stringify(users, null, 2), 'utf8');
}

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie
}));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const users = await getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        req.session.user = { id: user.id, username: user.username };
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const users = await getUsers();
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = { id: users.length + 1, username, password, email };
        users.push(newUser);
        await saveUsers(users);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route
app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: `Welcome ${req.session.user.username}! This is a protected route.` });
    } else {
        res.status(401).json({ message: 'Unauthorized access' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});