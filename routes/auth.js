const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

const router = express.Router();

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
}
);
module.exports = router;