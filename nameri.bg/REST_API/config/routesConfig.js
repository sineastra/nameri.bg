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
        const data = [
            {
                heading: "Предлагам кочове 1",
                prices: ["100", "200", "300"],
                images: [
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/koch1.jpg",
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/koch2.jpg",
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/koch3.jpg",
                ],
                mainImg:
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/koch3.jpg",
                tags: ["koch", "коч", "коза"],
                premiumType: 0,
                reviews: [],
                rating: 0,
                details:
                    "ПРОДАВАМ ДОБРЕ ОХРАНЕН КОЧ. (ТОВА Е МЪЖКА КОЗА. МАЙ.) МНОГО ЯДЕ И ХАПЕ КАТ БЪЛХА. И ДРУГИ РАБОТИ.",
                city: "61a2999f1ca6e2df98793844",
                category: "61a0f00f229cb4690d2b88cf",
                subcategory: "61ae297a55b9790f36a4e614",
                user: "61a6a0afed501169b4aaf66e",
                timeCreated: Date.now(),
            },
            {
                heading: "ЗАПАЗЕН МОСКВИЧ 1",
                prices: ["10000", "20000", "30000"],
                images: [
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/moskvich1.jpg",
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/moskvich2.jpg",
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/moskvich3.jpg",
                ],
                mainImg:
                    "https://s3.eu-central-1.amazonaws.com/nameri.bg/listings/moskvich1.jpg",
                tags: ["москвич", "кола", "каруца"],
                premiumType: 2,
                reviews: [],
                rating: 0,
                details:
                    "МОСКВИЧА СА ПРОДАА ШОТ Е ПРЕКАЛЕНО ЛУКСОЗЕН НЕ МОЙМ СИ ГО ПОЗВОЛИМ ВЕЧЕ. 10 000 леа е с 1 гума, 20 000 леа 2 гуми и 30 бона са 4 гуми на промоция.",
                city: "61a2999f1ca6e2df98793844",
                category: "61a0f00f229cb4690d2b88d1",
                subcategory: "61ae3b3df7e836f09dfaff6d",
                user: "61a6a0afed501169b4aaf66e",
                timeCreated: Date.now() + 1,
            },
        ]

        await ListingModel.insertMany(data)

        res.send("server working. make requests at /api")
    })
}

module.exports = routesConfig
