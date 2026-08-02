const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
    "/",
    verifyToken,
    authorize("Admin"),
    upload.single("profileImage"),
    doctorController.addDoctor
);

router.get(
    "/",
    verifyToken,
    doctorController.getDoctors
);

router.get(
    "/:id",
    verifyToken,
    doctorController.getDoctor
);

router.put(
    "/:id",
    verifyToken,
    authorize("Admin"),
    upload.single("profileImage"),
    doctorController.updateDoctor
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    doctorController.deleteDoctor
);

module.exports = router;