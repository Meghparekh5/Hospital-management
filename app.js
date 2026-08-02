const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", require("./routes/authRoutes"));
app.use("/api/departments", require("./routes/departmentRoutes"));
app.use("/api/doctors", require("./routes/doctorRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        project: "Hospital Management REST API",
        version: "1.0.0",
        developer: "Your Name"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API Not Found"
    });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});