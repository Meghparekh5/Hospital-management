const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Department = require("../models/Department");
const Appointment = require("../models/Appointment");
const Prescription = require("../models/Prescription");
const MedicalReport = require("../models/MedicalReport");

const getDashboard = async (req, res) => {
    try {

        const [
            totalDoctors,
            totalPatients,
            totalDepartments,
            totalAppointments,
            totalPrescriptions,
            totalReports
        ] = await Promise.all([
            Doctor.countDocuments(),
            Patient.countDocuments(),
            Department.countDocuments(),
            Appointment.countDocuments(),
            Prescription.countDocuments(),
            MedicalReport.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            dashboard: {
                totalDoctors,
                totalPatients,
                totalDepartments,
                totalAppointments,
                totalPrescriptions,
                totalReports
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    getDashboard
};