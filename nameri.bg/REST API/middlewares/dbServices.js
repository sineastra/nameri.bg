const listingsServices = require("../db/services/listingsServices")
const userServices = require("../db/services/userServices")
const categoriesServices = require("../db/services/categoriesServices")

const dbServices = (req, res, next) => {
    req.dbServices = {
        listingsServices,
        userServices,
        categoriesServices,
    }

    next()
}

module.exports = dbServices
