const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")

router.get("/popular", async (req, res) => {
    const dbService = (req, count) => req.dbServices.categoriesServices.getPopular(count)

    await abstractGetRequest(req, res, dbService)
})

router.get("/with-most-sub-cats", async (req, res) => {
    const dbService = (req, count) =>
        req.dbServices.categoriesServices.getWithMostSubs(count)

    await abstractGetRequest(req, res, dbService)
})

router.get("/:id", async (req, res) => {
    const _id = req.params.id
    const dbService = req => req.dbServices.categoriesServices.getSubcategories(_id)

    await abstractGetRequest(req, res, dbService)
})

module.exports = router
