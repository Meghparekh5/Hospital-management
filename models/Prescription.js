const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
{
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
        required:true
    },
    medicines:[
        {
            medicineName:{
                type:String,
                required:true
            },
            dosage:{
                type:String,
                required:true
            },
            duration:{
                type:String,
                required:true
            }
        }
    ],
    diagnosis:{
        type:String,
        required:true
    },
    doctorNotes:{
        type:String,
        default:""
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Prescription",prescriptionSchema);