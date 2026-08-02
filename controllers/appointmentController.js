const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Department = require("../models/Department");

const addAppointment = async (req, res) => {

    try {

        const {
            patientId,
            doctorId,
            departmentId,
            appointmentDate,
            appointmentTime
        } = req.body;

        const patient = await Patient.findById(patientId);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found"
            });
        }

        const department = await Department.findById(departmentId);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: "Department not found"
            });
        }

        const appointment = await Appointment.create({
            patientId,
            doctorId,
            departmentId,
            appointmentDate,
            appointmentTime
        });

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find()
            .populate("patientId")
            .populate("doctorId")
            .populate("departmentId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            total: appointments.length,
            appointments
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id)
            .populate("patientId")
            .populate("doctorId")
            .populate("departmentId");

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        return res.status(200).json({
            success: true,
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateAppointment = async (req, res) => {
    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        if (req.body.patientId) {
            const patient = await Patient.findById(req.body.patientId);

            if (!patient) {
                return res.status(404).json({
                    success: false,
                    message: "Patient not found"
                });
            }

            appointment.patientId = req.body.patientId;
        }

        if (req.body.doctorId) {
            const doctor = await Doctor.findById(req.body.doctorId);

            if (!doctor) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                });
            }

            appointment.doctorId = req.body.doctorId;
        }

        if (req.body.departmentId) {
            const department = await Department.findById(req.body.departmentId);

            if (!department) {
                return res.status(404).json({
                    success: false,
                    message: "Department not found"
                });
            }

            appointment.departmentId = req.body.departmentId;
        }

        appointment.appointmentDate =
            req.body.appointmentDate || appointment.appointmentDate;

        appointment.appointmentTime =
            req.body.appointmentTime || appointment.appointmentTime;

        appointment.status =
            req.body.status || appointment.status;

        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteAppointment = async (req, res) => {

    try {

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        await appointment.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const changeAppointmentStatus = async (req, res) => {

    try {

        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        appointment.status = status;

        await appointment.save();

        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    deleteAppointment,
    changeAppointmentStatus
};