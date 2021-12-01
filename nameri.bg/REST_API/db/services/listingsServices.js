const ListingModel = require("../models/ListingModel")

const listingsServices = {
    getBest: async count =>
        await ListingModel.find({ premium: true })
            .populate("reviews")
            .populate("user")
            .sort({ rating: "desc" })
            .limit(count)
            .exec(),
    getListing: async _id =>
        await ListingModel.findById(_id).populate("user").populate("reviews").exec(),
    getSimilar: async (tags, listingId) =>
        await ListingModel.find({
            $and: [{ _id: { $ne: listingId } }, { tags: { $in: tags } }],
        })
            .populate("user")
            .populate("reviews")
            .exec(),
    getUserListings: async userId => {
        const result = await ListingModel.find({ user: userId }).exec()

        console.log(typeof result[0].user)
        console.log(typeof userId)
        console.log(result[0].user === userId)

        return result
    },
}

module.exports = listingsServices
