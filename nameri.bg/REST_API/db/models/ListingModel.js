const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    prices: [{ type: String }],
    images: [{ type: String }],
    mainImg: { type: String, required: true, default: "" },
    tags: [{ type: String }],
    premiumType: { type: Number, required: true, default: 0 },
    reviews: [{ type: String, ref: "Review", required: true, default: [] }],
    rating: { type: Number, required: true, default: 0 },
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
