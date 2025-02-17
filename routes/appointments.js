const express = require("express");
const { Appointment } = require("../models");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/create-appointment", authMiddleware, async (req, res) => {
    try {
        const appointment = await Appointment.create({
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            userId: req.user.userId
        });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/user-appointments", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId; 
        const appointments = await Appointment.findAll({
            where: {
                userId: userId 
            }
        });
        res.json(appointments); 
    } catch (err) {
        res.status(500).json({ error: err.message }); 
    }
});

router.delete("/delete-appointment/:id", authMiddleware, async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const userId = req.user.userId;

        const appointment = await Appointment.findOne({
            where: {
                id: appointmentId,
                userId: userId
            }
        });

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found or unauthorized" });
        }

        await appointment.destroy();

        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/booked-slots", async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            attributes: ['slot'] 
        });

        const bookedSlots = appointments.map(appointment => appointment.slot); // Extract slots

        res.json(bookedSlots);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
