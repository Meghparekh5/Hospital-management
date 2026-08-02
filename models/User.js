const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["Admin", "Doctor", "Receptionist", "Patient"],
            default: "Patient"
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;