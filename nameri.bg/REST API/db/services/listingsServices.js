const ListingModel = require("../models/ListingModel")

const listingsServices = {
    getBest: async count =>
        await ListingModel.find({ premium: true })
            .populate("reviews")
            .populate("user")
            .sort({ rating: "desc" })
            .limit(count)
            .exec(),
    getListing: async _id => await ListingModel.findById(_id).populate("user").exec(),
}

module.exports = listingsServices
