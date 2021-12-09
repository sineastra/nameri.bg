const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoriesController")
const listingsController = require("../controllers/listingsController")
const townsController = require("../controllers/townsController")
const CategoryModel = require("../db/models/CategoryModel")
const ListingModel = require("../db/models/ListingModel")
const SubcategoryModel = require("../db/models/SubcategoryModel")
const ReviewModel = require("../db/models/ReviewModel")
const TownModel = require("../db/models/TownModel")
const ConversationModel = require("../db/models/ConversationModel")

// import all controllers for each routes

const routesConfig = app => {
	app.use("/api/user", userController)
	app.use("/api/categories", categoryController)
	app.use("/api/listings", listingsController)
	app.use("/api/towns", townsController)
	app.use("/add", async (req, res) => {
		// const data = [
		// 	{
		// 		name: "Адвокат",
		// 		listings: [],
		// 		category: "61a0f00f229cb4690d2b88d2",
		// 	},
		// 	{
		// 		name: "Нотариус",
		// 		listings: [],
		// 		category: "61a0f00f229cb4690d2b88d2",
		// 	},
		// ]
		//
		// await SubcategoryModel.insertMany(data)

		// res.send("server working. make requests at /api")
	})
}

module.exports = routesConfig
