const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({
	heading: { type: String, required: true },
	price: { type: String },
	images: [{ type: String }],
	mainImg: { type: String, default: "" },
	tags: [{ type: String }],
	premiumType: { type: Number, default: 0 },
	reviews: [{ type: String, ref: "Review", default: [] }],
	rating: { type: Number, default: 0 },
	details: { type: String },
	town: { type: String, ref: "Town", required: true },
	category: { type: String, ref: "Category", required: true },
	subcategory: { type: String, ref: "Subcategory", required: true },
	user: {
		type: String,
		ref: "User",
		required: true,
	},
	timeCreated: { type: Date, required: true, default: Date.now },
})

const ListingModel = mongoose.model("Listing", ListingSchema)

module.exports = ListingModel
