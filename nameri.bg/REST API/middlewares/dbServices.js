const listingsServices = require("../db/services/listingsServices")
const userServices = require("../db/services/userServices")
const categoriesServices = require("../db/services/categoriesServices")
const townsServices = require("../db/services/townsServices")

const dbServices = (req, res, next) => {
    req.dbServices = {
        listingsServices,
        userServices,
        categoriesServices,
        townsServices
    }

    next()
}

module.exports = dbServices
