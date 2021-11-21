const mongoose = require("mongoose");
const shortid = require("shortid");

const Standby_room = mongoose.model(
    "Standby_room",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        name: {type: String},
        list: [
            {
                patient_id: {type: String},
                arrivedAt: {type: Date},
                status: {type: String}
            }
        ]
    },
    {
        timestamps: true,
    })
);

module.exports = Standby_room;