const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
const User = db.User;

const router = express.Router();

// Signup Endpoint
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
        });
        res.json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register user"});
    }
});

// Login Endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful",token, user: { id: user.id} });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
