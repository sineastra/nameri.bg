const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String },
    subcategories: [{ type: "ObjectId", ref: "Subcategory", required: true }],
})

const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel
