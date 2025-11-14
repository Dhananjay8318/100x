const express = require('express');
const app = express();
app.use(express.json());

const users = [];

// TOKEN GENERATOR FUNCTION
function generateToken() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.json({
            message: "You are already signed up"
        });
    }

    users.push({
        username: username,
        password: password
    });

    res.json({
        message: "You are signed in"
    });
});

app.post("/signin", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(u => u.username === username && u.password === password);

    if (!foundUser) {
        return res.json({
            message: "Invalid username or password"
        });
    }

    const token = generateToken();
    foundUser.token = token;

    res.json({
        message: token
    });
    console.user(users)
});

app.listen(3000);
