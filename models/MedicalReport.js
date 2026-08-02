const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema(
{
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    reportTitle:{
        type:String,
        required:true,
        trim:true
    },
    reportFile:{
        type:String,
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("MedicalReport",medicalReportSchema);