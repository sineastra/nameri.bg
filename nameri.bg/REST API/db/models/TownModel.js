const mongoose = require("mongoose")

const TownSchema = new mongoose.Schema({
    name: { type: String, required: true },
    listings: [{ type: "ObjectId", ref: "Listing", default: [] }],
})

const TownModel = mongoose.model("Town", TownSchema)

module.exports = TownModel
