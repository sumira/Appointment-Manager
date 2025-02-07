const express = require("express");
const { Appointment } = require("../models");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/appointments", authMiddleware, async (req, res) => {
    try {
        const appointment = await Appointment.create({
            slot: req.body.slot,
            userId: req.userId
        });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
