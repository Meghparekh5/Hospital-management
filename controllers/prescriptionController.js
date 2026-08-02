const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");

const addPrescription = async(req,res)=>{

    try{

        const {
            appointmentId,
            medicines,
            diagnosis,
            doctorNotes
        } = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.status(404).json({
                success:false,
                message:"Appointment not found"
            });
        }

        const prescription = await Prescription.create({
            appointmentId,
            medicines,
            diagnosis,
            doctorNotes
        });

        return res.status(201).json({
            success:true,
            message:"Prescription added successfully",
            prescription
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const getPrescriptions = async(req,res)=>{

    try{

        const prescriptions = await Prescription.find()
        .populate({
            path:"appointmentId",
            populate:[
                {
                    path:"patientId"
                },
                {
                    path:"doctorId"
                },
                {
                    path:"departmentId"
                }
            ]
        })
        .sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            total:prescriptions.length,
            prescriptions
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
const getPrescription = async (req, res) => {

    try {

        const prescription = await Prescription.findById(req.params.id)
            .populate({
                path: "appointmentId",
                populate: [
                    { path: "patientId" },
                    { path: "doctorId" },
                    { path: "departmentId" }
                ]
            });

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found"
            });
        }

        return res.status(200).json({
            success: true,
            prescription
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updatePrescription = async (req, res) => {

    try {

        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found"
            });
        }

        prescription.medicines =
            req.body.medicines || prescription.medicines;

        prescription.diagnosis =
            req.body.diagnosis || prescription.diagnosis;

        prescription.doctorNotes =
            req.body.doctorNotes || prescription.doctorNotes;

        await prescription.save();

        return res.status(200).json({
            success: true,
            message: "Prescription updated successfully",
            prescription
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deletePrescription = async (req, res) => {

    try {

        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found"
            });
        }

        await prescription.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Prescription deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addPrescription,
    getPrescriptions,
    getPrescription,
    updatePrescription,
    deletePrescription
};