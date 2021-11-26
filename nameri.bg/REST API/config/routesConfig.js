const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoriesController")
const listingsController = require("../controllers/listingsController")
const CategoryModel = require("../db/models/CategoryModel")
const ListingModel = require("../db/models/ListingModel")
const SubcategoryModel = require("../db/models/SubcategoryModel")
const ReviewModel = require("../db/models/ReviewModel")

// import all controllers for each routes

const routesConfig = app => {
    app.use("/api/user", userController)
    app.use("/api/categories", categoryController)
    app.use("/api/listings", listingsController)
    app.use("/", async (req, res) => {
        // const data = [
        //     {
        //         text: "very mery",
        //         listing: "61a0ebdab8fcb905205a045e",
        //         rating: 5,
        //         owner: "61a0b53ceba94a80010500c6",
        //         timeCreated: Date.now,
        //     },
        //     {
        //         text: "very mery",
        //         listing: "61a0ebdab8fcb905205a045e",
        //         rating: 4,
        //         owner: "61a0b53ceba94a80010500c6",
        //         timeCreated: Date.now,
        //     },
        //     {
        //         text: "very mery",
        //         listing: "61a0ebdab8fcb905205a045f",
        //         rating: 5,
        //         owner: "61a0b53ceba94a80010500c6",
        //         timeCreated: Date.now,
        //     },
        //     {
        //         text: "very mery",
        //         listing: "61a0ebdab8fcb905205a045f",
        //         rating: 5,
        //         owner: "61a0b53ceba94a80010500c6",
        //         timeCreated: Date.now,
        //     },
        // ]
        // await ReviewModel.collection.insertMany(data)
    })
}

module.exports = routesConfig
