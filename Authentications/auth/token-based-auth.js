const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const config = require('../config/env.config');
const jwtMiddleware = require('../middleware/jwtVerification.middleware');

const app = express();

const getUsers = async () => {
    const data = await fs.readFile('../data/users.data.json', 'utf8');
    return JSON.parse(data);
};

const saveUsers = async (users) => {
    await fs.writeFile('../data/users.data.json', JSON.stringify(users, null, 2), 'utf8');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login route - generate a JWT on successful login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const users = await getUsers();

    // Find user
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    try {
        //Create payload for JWT
        const payload = { id: user.id, username: user.username, email: user.email };

        // sign token
        const token = jwt.sign(payload, config.development.JWT_SECRET, { expiresIn: '2h' });

        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Protected route 
app.get('/protected', jwtMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have accessed a protected route', user: req.user });
});


