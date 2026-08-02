const Doctor = require("../models/Doctor");
const Department = require("../models/Department");

const addDoctor = async (req, res) => {
    try {

        const {
            departmentId,
            name,
            qualification,
            specialization,
            experience,
            contactNumber,
            email
        } = req.body;

        const department = await Department.findById(departmentId);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        const exists = await Doctor.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Doctor already exists"
            });
        }

        const doctor = await Doctor.create({
            departmentId,
            name,
            qualification,
            specialization,
            experience,
            contactNumber,
            email,
            profileImage: req.file ? req.file.filename : ""
        });

        return res.status(201).json({
            success: true,
            message: "Doctor added successfully",
            doctor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getDoctors = async (req, res) => {

    try {

        const doctors = await Doctor.find()
            .populate("departmentId", "departmentName description")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: doctors.length,
            doctors
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id)
            .populate("departmentId");

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        return res.status(200).json({
            success: true,
            doctor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateDoctor = async (req, res) => {
    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        if (req.body.departmentId) {
            const department = await Department.findById(req.body.departmentId);

            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });
            }

            doctor.departmentId = req.body.departmentId;
        }

        doctor.name = req.body.name || doctor.name;
        doctor.qualification = req.body.qualification || doctor.qualification;
        doctor.specialization = req.body.specialization || doctor.specialization;
        doctor.experience = req.body.experience || doctor.experience;
        doctor.contactNumber = req.body.contactNumber || doctor.contactNumber;
        doctor.email = req.body.email || doctor.email;

        if (req.file) {
            doctor.profileImage = req.file.filename;
        }

        await doctor.save();

        return res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            doctor
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteDoctor = async (req, res) => {

    try {

        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        await doctor.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Doctor deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
};