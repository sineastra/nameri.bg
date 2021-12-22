const CategoryModel = require("../models/CategoryModel")
const SubcategoryModel = require("../models/SubcategoryModel")

const categoriesServices = {
	getPopular: async count =>
		await CategoryModel.find({})
			.sort({ subcategories: -1 })
			.limit(count)
			.populate("subcategories")
			.exec(),

	getWithMostSubs: async count =>
		await CategoryModel.find({})
			.sort({ subcategories: 1 })
			.limit(count)
			.populate("subcategories")
			.exec(),

	getSubcategories: async _id =>
		await CategoryModel.findOne({ _id }).populate("subcategories").exec(),

	getSubCatListings: async (_id, limit) =>
		await SubcategoryModel.findOne({ _id })
			.populate({
				path: "listings",
				options: {
					limit,
				},
				populate: [
					{
						path: "user",
						model: "User",
					},
					{
						path: "town",
						model: "Town",
					},
				],
			})
			.exec(),

	getAll: async () => await CategoryModel.find({}).populate("subcategories").exec(),
	getAllCategoryNames: async () => await CategoryModel.find({}).select("name -_id").exec(),
	getAllSubCategoryNames: async () => await SubcategoryModel.find({}).select("name -_id").exec(),
	getById: async (_id) => await CategoryModel.findById(_id).exec(),
	getSubcategoryById: async (_id) => await SubcategoryModel.findById(_id).exec(),
}

module.exports = categoriesServices
