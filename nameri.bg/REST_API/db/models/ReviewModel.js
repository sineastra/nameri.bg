const mongoose = require("mongoose")

const ReviewSchema = new mongoose.Schema({
	text: { type: String },
	rating: { type: Number, default: 0 },
	user: { type: "String", ref: "User", required: true },
	reviewCreator: { type: "String", ref: "User", required: true },
	timeCreated: { type: Date, required: true, default: Date.now },
})

const ReviewModel = mongoose.model("Review", ReviewSchema)

module.exports = ReviewModel
