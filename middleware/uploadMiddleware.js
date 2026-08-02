const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/doctors");
    },
    filename: (req, file, cb) => {
        const fileName =
            Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG and PNG images are allowed."));
    }
};

module.exports = multer({
    storage,
    fileFilter
});