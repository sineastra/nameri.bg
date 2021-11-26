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
}

module.exports = categoriesServices
