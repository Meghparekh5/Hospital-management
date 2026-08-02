const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
{
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    departmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    },
    appointmentTime:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Completed",
            "Cancelled"
        ],
        default:"Pending"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Appointment",appointmentSchema);