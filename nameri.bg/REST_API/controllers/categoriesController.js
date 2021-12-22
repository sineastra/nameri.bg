const router = require("express").Router()
const { abstractDBRequest } = require("../helpers/abstractRequests.js")

router.get("/popular", async (req, res) => {
	const dbService = (req, count) => req.dbServices.categoriesServices.getPopular(count)

	await abstractDBRequest(req, res, dbService)
})

router.get("/with-most-sub-cats", async (req, res) => {
	const dbService = (req, count) =>
		req.dbServices.categoriesServices.getWithMostSubs(count)

	await abstractDBRequest(req, res, dbService)
})

router.get("/:id", async (req, res) => {
	const _id = req.params.id
	const dbService = req => req.dbServices.categoriesServices.getSubcategories(_id)

	await abstractDBRequest(req, res, dbService)
})

router.get("/subcategories/:id", async (req, res) => {
	const _id = req.params.id
	const limit = req.query.limit || 2

	console.log(limit)
	console.log(_id)
	const dbService = req => req.dbServices.categoriesServices.getSubCatListings(_id, limit)

	await abstractDBRequest(req, res, dbService)
})

router.get("/", async (req, res) => {
	const dbService = req => req.dbServices.categoriesServices.getAll()

	await abstractDBRequest(req, res, dbService)
})

module.exports = router
