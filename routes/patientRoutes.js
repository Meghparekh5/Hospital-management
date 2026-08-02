const express = require("express");

const router = express.Router();

const patientController = require("../controllers/patientController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    verifyToken,
    authorize("Admin", "Receptionist"),
    patientController.addPatient
);

router.get(
    "/",
    verifyToken,
    patientController.getPatients
);

router.get(
    "/:id",
    verifyToken,
    patientController.getPatient
);

router.put(
    "/:id",
    verifyToken,
    authorize("Admin", "Receptionist"),
    patientController.updatePatient
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    patientController.deletePatient
);

module.exports = router;