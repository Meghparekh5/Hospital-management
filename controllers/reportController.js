const MedicalReport = require("../models/MedicalReport");
const Patient = require("../models/Patient");

const uploadReport = async(req,res)=>{

    try{

        const{
            patientId,
            reportTitle
        }=req.body;

        const patient=await Patient.findById(patientId);

        if(!patient){

            return res.status(404).json({
                success:false,
                message:"Patient not found"
            });

        }

        if(!req.file){

            return res.status(400).json({
                success:false,
                message:"Report file is required"
            });

        }

        const report=await MedicalReport.create({

            patientId,
            reportTitle,
            reportFile:req.file.filename

        });

        return res.status(201).json({

            success:true,
            message:"Medical report uploaded successfully",
            report

        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
const getReports = async(req,res)=>{

    try{

        const reports=await MedicalReport.find()
        .populate("patientId")
        .sort({createdAt:-1});

        return res.status(200).json({

            success:true,
            total:reports.length,
            reports

        });

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};
const getReport = async (req, res) => {
    try {

        const report = await MedicalReport.findById(req.params.id)
            .populate("patientId");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Medical report not found"
            });
        }

        return res.status(200).json({
            success: true,
            report
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateReport = async (req, res) => {
    try {

        const report = await MedicalReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Medical report not found"
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

            report.patientId = req.body.patientId;
        }

        report.reportTitle =
            req.body.reportTitle || report.reportTitle;

        if (req.file) {
            report.reportFile = req.file.filename;
        }

        await report.save();

        return res.status(200).json({
            success: true,
            message: "Medical report updated successfully",
            report
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteReport = async (req, res) => {
    try {

        const report = await MedicalReport.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Medical report not found"
            });
        }

        await report.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Medical report deleted successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    uploadReport,
    getReports,
    getReport,
    updateReport,
    deleteReport
};