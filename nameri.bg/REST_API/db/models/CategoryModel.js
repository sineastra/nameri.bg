const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String },
    icon: { type: String },
    subcategories: [{ type: String, ref: "Subcategory", required: true }],
})

const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel
