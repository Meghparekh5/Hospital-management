const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    address:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true,
        unique:true
    },
    bloodGroup:{
        type:String,
        enum:[
            "A+","A-",
            "B+","B-",
            "AB+","AB-",
            "O+","O-"
        ],
        required:true
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Patient",patientSchema);