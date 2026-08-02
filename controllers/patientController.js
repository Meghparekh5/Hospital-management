const Patient = require("../models/Patient");

const addPatient = async (req,res)=>{

    try{

        const {
            name,
            age,
            gender,
            address,
            mobileNumber,
            bloodGroup
        } = req.body;

        const exists = await Patient.findOne({mobileNumber});

        if(exists){
            return res.status(400).json({
                success:false,
                message:"Patient already exists"
            });
        }

        const patient = await Patient.create({
            name,
            age,
            gender,
            address,
            mobileNumber,
            bloodGroup
        });

        return res.status(201).json({
            success:true,
            message:"Patient registered successfully",
            patient
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const getPatients = async(req,res)=>{

    try{

        const patients = await Patient.find().sort({createdAt:-1});

        return res.status(200).json({
            success:true,
            total:patients.length,
            patients
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

const getPatient = async(req,res)=>{

    try{

        const patient = await Patient.findById(req.params.id);

        if(!patient){
            return res.status(404).json({
                success:false,
                message:"Patient not found"
            });
        }

        return res.status(200).json({
            success:true,
            patient
        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
const updatePatient = async (req, res) => {
    try {

        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        patient.name = req.body.name || patient.name;
        patient.age = req.body.age || patient.age;
        patient.gender = req.body.gender || patient.gender;
        patient.address = req.body.address || patient.address;
        patient.mobileNumber = req.body.mobileNumber || patient.mobileNumber;
        patient.bloodGroup = req.body.bloodGroup || patient.bloodGroup;

        await patient.save();

        return res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            patient
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deletePatient = async (req, res) => {

    try {

        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        await patient.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Patient deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
};