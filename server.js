// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.getUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid email or password. Please try again.');
        }

        // Redirect to eamcet.html after successful login
        res.redirect('/eamcet.html');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in. Please try again.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
