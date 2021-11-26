const mongoose = require("mongoose")

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    listings: [{ type: "ObjectId", ref: "Listing", required: true }],
})

const SubcategoryModel = mongoose.model("Subcategory", SubcategorySchema)

module.exports = SubcategoryModel
