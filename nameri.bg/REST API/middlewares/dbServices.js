const listingServices = require("../db/services/listingsServices")
const userServices = require("../db/services/userServices")

const dbServices = (req, res, next) => {
    req.dbServices = {
        listingServices,
        userServices,
    }

    next()
}

module.exports = dbServices
