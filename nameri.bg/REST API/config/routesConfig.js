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
            messages: [
                {
                    sender: "61a63e07e7cfabb412d88fb1",
                    text: "zdr bepce",
                },
                {
                    sender: "61a63e07e7cfabb412d88fb1",
                    text: "kasi",
                },
                {
                    sender: "61a63e07e7cfabb412d88fb1",
                    text: "ai sa zapoznaim",
                },
                {
                    sender: "61a63e38e7cfabb412d88fb2",
                    text: "begi ot tuka e galosh",
                },
            ],
            user: "61a63e38e7cfabb412d88fb2",
            participants: ["61a63e07e7cfabb412d88fb1"],
        }
        await ConversationModel.collection.insertOne(data)
    })
}

module.exports = routesConfig
