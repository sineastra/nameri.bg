const ListingModel = require("../models/ListingModel")

const listingsServices = {
	getBest: async count =>
		await ListingModel.find({ premium: true })
			.populate("reviews")
			.populate("user")
			.sort({ rating: "desc" })
			.limit(count)
			.exec(),
	getListingWithUserReviews: async _id =>
		await ListingModel
			.findById(_id)
			.populate({
				path: "user",
				populate: {
					path: "reviews",
					populate: {
						path: "reviewCreator",
					},
				},
			})
			.populate({
				path: "category",
				populate: {
					path: "subcategories",
				},
			})
			.populate('subcategory')
			.populate("town")
			.exec(),
	getSimilar: async (tags, listingId) =>
		await ListingModel.find({
			$and: [{ _id: { $ne: listingId } }, { tags: { $in: tags } }],
		})
			.populate("user")
			.populate("reviews")
			.populate("town")
			.exec(),
	getUserListings: async userId =>
		await ListingModel.find({ user: userId }).populate("user").exec(),
	addNew: async (listing) => await new ListingModel(listing).save(),
	updateListing: async (listing, listingId) => await ListingModel.findByIdAndUpdate(listingId, listing),
	searchListings: async (criteria) => {
		const regex = new RegExp(criteria, "i")

		return await ListingModel.find({}).or([
			{ heading: { $regex: criteria, $options: 'i' } },
			{ tags: { $in: [regex] } },
			{ details: { $regex: criteria, $options: 'i' } },
		])
			.populate("user")
			.populate("town")
			.exec()
	},
}

module.exports = listingsServices
