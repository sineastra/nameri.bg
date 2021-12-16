const router = require("express").Router()
const { abstractGetRequest } = require("./abstractRequests")
const { body, validationResult } = require("express-validator")
const uploadImages = require("../helpers/uploadFilesS3.js")
const processFormData = require("../middlewares/processFormData.js")

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
	body("category")
		.isLength({ min: 1 })
		.withMessage("Category is required")
		.custom((value, { req }) => req.customValidators.doCategoryExists(value, req))
		.withMessage("Not a valid category!"),
	body("subcategory")
		.isLength({ min: 1 })
		.withMessage("Subcategory is required")
		.custom((value, { req }) => req.customValidators.doSubCategoryExists(value, req))
		.withMessage("Not a valid subcategory!"),
	body("town")
		.isLength({ min: 1 })
		.withMessage("Town is required")
		.custom((value, { req }) => req.customValidators.doTownExists(value, req))
		.withMessage("Not a valid town!"),
	body("price")
		.isInt({ min: 0 })
		.withMessage("Must be a number or 0 - for negotiation price"),
	body("details")
		.isLength({ min: 10 })
		.withMessage("Description must be at least 10 symbols long."),
	body("heading")
		.isLength({ min: 5 })
		.withMessage("Heading must be at least 5 symbols long."),
	body("tags")
		.isLength({ min: 2 })
		.withMessage("Must have at least 2 tags!"),
	async (req, res) => {
		const errors = validationResult(req)
		let images = []

		if (errors.isEmpty()) {
			try {
				if (req.files && req.files.length > 0) {
					const responseData = await uploadImages(Object.values(req.files))

					images = responseData.map(x => x.Location)
				}

				const [town, category, subcategory] = await Promise.all([
					req.dbServices.townsServices.getByName(req.body.town),
					req.dbServices.categoriesServices.getCategoryByName(req.body.category),
					req.dbServices.categoriesServices.getSubcategoryByName(req.body.subcategory),
				])
				const mainImg = images[0] || ''

				const newListing = {
					heading: req.body.heading,
					price: req.body.price,
					images,
					mainImg,
					tags: req.body.tags,
					premiumType: 0,
					reviews: [],
					rating: 0,
					details: req.body.details,
					town: town._id,
					category: category._id,
					subcategory: subcategory._id,
					user: req.user._id,
					timeCreated: Date.now(),
				}

				const data = await req.dbServices.listingsServices.addNew(newListing)

				res.json({ ok: true, status: 'Created', statusCode: 201, data })
			} catch (e) {
				res.status(503).json({
					ok: false,
					status: 'Service Unavailable',
					statusCode: 503,
					msg: 'Invalid field names or error while connection to the Database. Please wait few minutes and try again.',
				})
			}
		} else {
			res.json({ ok: false, errors })
		}
	},
)

module.exports = router

// body("phone")
// .isMobilePhone(["bg-BG"])
// .withMessage("Not a valid Bulgarian phone number!"),
// body("website").isURL().withMessage("Must be a valid website!"),
// body("email").isEmail().withMessage("Must be a valid email!"),
// body("address")
// .isLength({ min: 6 })
// .withMessage("Address must be at least 6 characters long!"),
// body("password")
// .isLength({ min: 6 })
// .withMessage("Password must be at least 6 symbols!")
// .custom((value, { req }) => req.customValidators.doPasswordsMatch(value, req))
// .withMessage("Passwords do not match!"),


