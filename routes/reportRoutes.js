const express = require("express");

const router = express.Router();

const reportController = require("../controllers/reportController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload = require("../middleware/reportUpload");

router.post(
    "/",
    verifyToken,
    authorize("Admin", "Doctor"),
    upload.single("reportFile"),
    reportController.uploadReport
);

router.get(
    "/",
    verifyToken,
    reportController.getReports
);

router.get(
    "/:id",
    verifyToken,
    reportController.getReport
);

router.put(
    "/:id",
    verifyToken,
    authorize("Admin", "Doctor"),
    upload.single("reportFile"),
    reportController.updateReport
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    reportController.deleteReport
);

module.exports = router;