const router = require("express").Router()
const {  abstractDBRequest } = require("../helpers/abstractRequests.js")

router.get("/", async (req, res) => {
    const dbService = req => req.dbServices.townsServices.getAll()

    await abstractDBRequest(req, res, dbService)
})

module.exports = router
