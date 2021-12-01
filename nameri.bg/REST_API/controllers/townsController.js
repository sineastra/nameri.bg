const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")

router.get("/", async (req, res) => {
    const dbService = req => req.dbServices.townsServices.getAll()

    await abstractGetRequest(req, res, dbService)
})

module.exports = router
