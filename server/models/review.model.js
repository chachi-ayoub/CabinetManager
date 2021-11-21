const mongoose = require("mongoose");
const shortid = require("shortid");

const Review = mongoose.model(
    "Review",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        reviewer_id: {type: String}, 
        docor_id: {type: String},
        content: {type: String}
    },
    {
        timestamps: true,
    })
);

module.exports = Review;