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
			.populate("town")
			.exec(),
	getUserListings: async userId => {
		const result = await ListingModel.find({ user: userId }).exec()

		return result
	},
	addNew: async (listing) => await new ListingModel(listing).save(),
}

module.exports = listingsServices
