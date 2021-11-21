const mongoose = require("mongoose");
const shortid = require("shortid");

const Appointment = mongoose.model(
    "Appointment",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        patient_id: {type: String},
        doctor_id: {type: String}, 
        date: {type: Date},
        status: {type: String}
    },
    {
        timestamps: true,
    })
);

module.exports = Appointment;