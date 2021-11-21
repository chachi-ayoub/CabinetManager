const mongoose = require("mongoose");
const shortid = require("shortid");

const Ressource = mongoose.model(
    "Ressource",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        type: {type: String},
        reason: {type: String},
        assitant_id: {type: String},
        user_id: {type: String},
        amount: {type: Number}  
    },
    {
        timestamps: true,
    })
);

module.exports = Ressource;