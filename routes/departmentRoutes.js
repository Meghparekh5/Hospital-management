const express = require("express");

const router = express.Router();

const departmentController = require("../controllers/departmentController");

const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

router.post("/", verifyToken, authorize("Admin"), departmentController.addDepartment);

router.get(
    "/",
    verifyToken,
    departmentController.getDepartments
);

router.get(
    "/:id",
    verifyToken,
    departmentController.getDepartment
);

router.put(
    "/:id",
    verifyToken,
    authorize("Admin"),
    departmentController.updateDepartment
);

router.delete(
    "/:id",
    verifyToken,
    authorize("Admin"),
    departmentController.deleteDepartment
);

module.exports = router;