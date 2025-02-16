require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointments");

const db = require("./models");

db.sequelize.sync().then(() => {
    console.log("Database connected and synchronized");
}).catch(err => {
    console.error("Database connection error:", err);
});


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Appointment Booking API is running..."));
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
