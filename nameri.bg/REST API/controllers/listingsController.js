const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")

router.get("/best", async (req, res) => {
    const dbService = (req, count) => req.dbServices.listingsServices.getBest(count)

    const result = await abstractGetRequest(req, res, dbService)

    console.log(result)
})

module.exports = router
