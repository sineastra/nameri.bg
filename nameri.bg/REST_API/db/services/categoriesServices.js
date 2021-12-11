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
            .sort({ subcategories: -1 })
            .limit(count)
            .populate("subcategories")
            .exec(),

    getSubcategories: async _id =>
        await CategoryModel.findOne({ _id }).populate("subcategories").exec(),

    getSubCatListings: async _id =>
        await SubcategoryModel.findOne({ _id })
            .populate({
                path: "listings",
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
}

module.exports = categoriesServices
