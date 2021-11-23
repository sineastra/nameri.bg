const mongoose = require("mongoose")

const ListingSchema = new mongoose.Schema({
    heading: { type: String, required: true },
    prices: [{ type: Number }],
    images: [{ type: String }],
    mainImg: { type: String },
    tags: { type: String },
    premiumType: { type: Boolean, required: true, default: false },
    reviews: [{ type: "ObjectId", ref: "Review", required: true, default: [] }],
    details: { type: String },
    city: { type: String, required: true },
    owner: { type: "ObjectId", ref: "User", required: true },
    timeCreated: { type: Date, required: true, default: Date.now },
})

const Listing = mongoose.model("Listing", ListingSchema)
