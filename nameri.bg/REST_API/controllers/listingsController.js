const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")
const { body, validationResult } = require("express-validator")
const uploadImages = require("../helpers/uploadFilesS3.js")
const processFormData = require("../middlewares/processFormData.js")
const { validateListing } = require("../middlewares/formsValidators.js")

const processListing = async (req, res, fetchData, listing = {}) => {
	const errors = validationResult(req)
	let images = listing.images || []

	if (errors.isEmpty()) {
		try {
			const files = Object.values(req.files)
			if (files && files.length > 0) {
				const responseData = await uploadImages(files)

				images = responseData.map(x => x.Location)
			}

			const [town, category, subcategory] = await Promise.all([
				req.dbServices.townsServices.getByName(req.body.town),
				req.dbServices.categoriesServices.getCategoryByName(req.body.category),
				req.dbServices.categoriesServices.getSubcategoryByName(req.body.subcategory),
			])
			const mainImg = images[0] || ''
			const tags = JSON.parse(req.body.tags)

			const listingData = {
				heading: req.body.heading,
				price: req.body.price,
				images,
				mainImg,
				tags: tags,
				premiumType: listing.premiumType || 0,
				reviews: listing.reviews || [],
				rating: listing.rating || 0,
				details: req.body.details,
				town: town._id,
				category: category._id,
				subcategory: subcategory._id,
				user: req.user._id,
			}

			const data = await fetchData(listingData, listing._id)

			res.json({ ok: true, statusText: 'ok', status: 200, data })
		} catch (e) {
			res.status(503).json({
				ok: false,
				statusText: 'Service Unavailable',
				status: 503,
				msg: 'Invalid field names or error while connection to the Database. Please wait few minutes and try again.',
			})
		}
	} else {
		res.json({ ok: false, errors })
	}
}

router.get("/best", async (req, res) => {
	const dbService = (req, count) => req.dbServices.listingsServices.getBest(count)

	await abstractGetRequest(req, res, dbService)
})

router.get("/details/:id", async (req, res) => {
	const _id = req.params.id

	const dbService = async req => {
		const listing = await req.dbServices.listingsServices.getListingWithUserReviews(_id)
		const similar = await req.dbServices.listingsServices.getSimilar(
			listing.tags,
			listing._id,
		)

		return { listing, similar }
	}

	await abstractGetRequest(req, res, dbService)
})

router.get("/user/:id", async (req, res) => {
	const userId = req.params.id
	const dbService = req => req.dbServices.listingsServices.getUserListings(userId)

	await abstractGetRequest(req, res, dbService)
})

router.post(
	"/add",
	processFormData,
	validateListing(),
	async (req, res) => {
		const fetchData = async (listing) =>
			await req.dbServices.listingsServices.addNew(listing)

		await processListing(req, res, fetchData)

	},
)

router.put(
	"/edit/:id",
	processFormData,
	validateListing(),
	async (req, res) => {
		try {
			const listing = await req.dbServices.listingsServices.getListingWithUserReviews(req.params.id)
			const fetchData = async (listing, id) =>
				await req.dbServices.listingsServices.updateListing(listing, id)

			await processListing(req, res, fetchData, listing)
		} catch (e) {
			res.json({ statusText: "Not Found", status: 404, msg: "Invalid listing ID", ok: false })
		}
	},
)
router.get("/search", async (req, res) => {
	const criteria = req.query.search
	const dbService = req => req.dbServices.listingsServices.searchListings(criteria)

	await abstractGetRequest(req, res, dbService)
})

router.get("/:id", async (req, res) => {
	const dbService = (req) => req.dbServices.listingsServices.getListingWithUserReviews(req.params.id)

	await abstractGetRequest(req, res, dbService)
})

module.exports = router


