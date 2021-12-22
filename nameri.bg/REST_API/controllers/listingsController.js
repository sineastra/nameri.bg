const router = require("express").Router()
const { abstractDBRequest } = require("../helpers/abstractRequests.js")
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
				town: req.body.town,
				category: req.body.category,
				subcategory: req.body.subcategory,
				user: req.user._id,
			}

			const data = await fetchData(req, listingData, listing._id)

			res.json({ ok: true, statusText: 'ok', status: 200, data })
		} catch (e) {
			console.log(e)
			res.status(503).json({
				ok: false,
				statusText: 'Service Unavailable',
				status: 503,
				msg: e,
			})
		}
	} else {
		res.json({ ok: false, errors })
	}
}

router.get("/best", async (req, res) => {
	const dbService = (req, count) => req.dbServices.listingsServices.getBest(count)

	await abstractDBRequest(req, res, dbService)
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

	await abstractDBRequest(req, res, dbService)
})

router.get("/user/:id", async (req, res) => {
	const userId = req.params.id
	const dbService = req => req.dbServices.listingsServices.getUserListings(userId)

	await abstractDBRequest(req, res, dbService)
})

router.post(
	"/add",
	processFormData,
	validateListing(),
	async (req, res) => {
		const fetchData = async (req, listing) => {
			const [town, subcategory, user] = await Promise.all([
				req.dbServices.townsServices.getById(req.body.town),
				req.dbServices.categoriesServices.getSubcategoryById(req.body.subcategory),
				req.dbServices.userServices.getById(req.user._id),
			])
			const newListing = await req.dbServices.listingsServices.addNew(listing)

			user.listings.push(newListing._id)
			subcategory.listings.push(newListing._id)
			town.listings.push(newListing._id)

			await Promise.all([subcategory.save(), town.save(), user.save()])

			return newListing
		}

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
			const fetchData = async (req, listing, id) =>
				await req.dbServices.listingsServices.updateListing(listing, id)

			await processListing(req, res, fetchData, listing)
		} catch (e) {
			res.json({ statusText: "Not Found", status: 404, msg: e, ok: false })
		}
	},
)
router.get("/search", async (req, res) => {
	const criteria = req.query.search
	const dbService = req => req.dbServices.listingsServices.searchListings(criteria)

	await abstractDBRequest(req, res, dbService)
})

router.get("/delete/:id", async (req, res) => {
	// const dbService = () => req.dbServices.listingsServices.deleteListing(req.params.id)
	//
	// await abstractDBRequest(req, res, dbService)
	res.status(503).json({
				ok: false,
				statusText: 'Service Unavailable',
				status: 503,
				msg: 'asd',
			})
})

router.get("/:id", async (req, res) => {
	const dbService = (req) => req.dbServices.listingsServices.getListingWithUserReviews(req.params.id)

	await abstractDBRequest(req, res, dbService)
})

module.exports = router


