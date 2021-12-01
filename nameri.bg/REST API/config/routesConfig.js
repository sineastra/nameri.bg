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
    app.use("/", async (req, res) => {
        const data = {
            heading: "Listing asdasdasdasd",
            prices: [4, 5, 6],
            images: [
                "../../../assets/images/service1.png",
                "../../../assets/images/service2.png",
                "../../../assets/images/service3.png",
            ],
            mainImg: "../../../assets/images/service2.png",
            tags: ["new"],
            premiumType: true,
            reviews: ["61a113fdb4ad6014e993a2c6", "61a113fdb4ad6014e993a2c7"],
            details: "This is the second listing",
            city: "Sofia",
            user: "61a6a0afed501169b4aaf66e",
            rating: "5",
        }
        await ListingModel.collection.insertOne(data)
    })
}

module.exports = routesConfig
