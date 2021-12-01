const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
    text: { type: String },
    listing: { type: "ObjectId", ref: "Listing", required: true },
    rating: { type: Number, required: true },
    user: { type: "ObjectId", ref: "User", required: true },
    timeCreated: { type: Date, required: true, default: Date.now },
})

const ReviewModel = mongoose.model("Review", ReviewSchema)

module.exports = ReviewModel
