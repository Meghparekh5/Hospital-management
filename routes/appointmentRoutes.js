const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    verifyToken,
    authorize("Admin", "Receptionist"),
    appointmentController.addAppointment
);

router.get(
    "/",
    verifyToken,
    appointmentController.getAppointments
);

router.get(
    "/:id",
    verifyToken,
    appointmentController.getAppointment
);

router.put(
    "/:id",
    verifyToken,
    authorize("Admin", "Receptionist"),
    appointmentController.updateAppointment
);

router.patch(
    "/:id/status",
    verifyToken,
    authorize("Admin", "Doctor"),
    appointmentController.changeAppointmentStatus
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    appointmentController.deleteAppointment
);

module.exports = router;