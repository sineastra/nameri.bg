const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoriesController")
const listingsController = require("../controllers/listingsController")
const townsController = require("../controllers/townsController")
const CategoryModel = require("../db/models/CategoryModel")
const ListingModel = require("../db/models/ListingModel")
const SubcategoryModel = require("../db/models/SubcategoryModel")
const ReviewModel = require("../db/models/ReviewModel")
const TownModel = require("../db/models/TownModel")

// import all controllers for each routes

const routesConfig = app => {
    app.use("/api/user", userController)
    app.use("/api/categories", categoryController)
    app.use("/api/listings", listingsController)
    app.use("/api/towns", townsController)
    app.use("/", async (req, res) => {
        // const data = [
        //     {
        //         name: "Sofia",
        //         listings: [],
        //     },
        //     {
        //         name: "Pernik",
        //         listings: [],
        //     },
        //     {
        //         name: "Plovdiv",
        //         listings: [],
        //     },
        //     {
        //         name: "Varna",
        //         listings: [],
        //     },
        // ]
        // await TownModel.collection.insertMany(data)
    })
}

module.exports = routesConfig
