const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")

router.get("/best", async (req, res) => {
    const dbService = (req, count) => req.dbServices.listingsServices.getBest(count)

    await abstractGetRequest(req, res, dbService)
})

router.get("/:id", async (req, res) => {
    const _id = req.params.id
    const dbService = (req) => req.dbServices.listingsServices.getListing(_id)

    await abstractGetRequest(req, res, dbService)
})

module.exports = router
