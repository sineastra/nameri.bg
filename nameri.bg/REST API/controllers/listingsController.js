const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")

router.get("/best", async (req, res) => {
    const dbService = (req, count) => req.dbServices.listingsServices.getBest(count)

    await abstractGetRequest(req, res, dbService)
})

router.get("/details/:id", async (req, res) => {
    const _id = req.params.id

    const dbService = async req => {
        const listing = await req.dbServices.listingsServices.getListing(_id)
        const similar = await req.dbServices.listingsServices.getSimilar(
            listing.tags,
            listing._id
        )

        return { listing, similar }
    }

    await abstractGetRequest(req, res, dbService)
})

module.exports = router
