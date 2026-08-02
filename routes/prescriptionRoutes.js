const express = require("express");

const router = express.Router();

const prescriptionController = require("../controllers/prescriptionController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post(
    "/",
    verifyToken,
    authorize("Doctor", "Admin"),
    prescriptionController.addPrescription
);

router.get(
    "/",
    verifyToken,
    prescriptionController.getPrescriptions
);

router.get(
    "/:id",
    verifyToken,
    prescriptionController.getPrescription
);

router.put(
    "/:id",
    verifyToken,
    authorize("Doctor", "Admin"),
    prescriptionController.updatePrescription
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    prescriptionController.deletePrescription
);

module.exports = router;