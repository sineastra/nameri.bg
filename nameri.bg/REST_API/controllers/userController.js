const bcrypt = require("bcrypt")
const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const { abstractGetRequest } = require("./abstractRequests")
const uploadImages = require("../helpers/uploadFilesS3.js")
const { createJWTToken, attachCookie } = require("../helpers/createJWTToken.js")
const processFormData = require("../middlewares/processFormData.js")

const signIn = async (req, res) => {
	const errors = validationResult(req)

	if (errors.isEmpty()) {
		const user = await req.dbServices.userServices.getByEmail(req.body.email)

		if (user && (await bcrypt.compare(req.body.password, user.hashedPassword))) {
			const token = createJWTToken(user)

			attachCookie(token, res)

			res.json({ ok: true, status: 200, statusCode: "OK", token })
		} else {
			res.status(401).json({
				ok: false,
				status: "Unauthorized",
				statusCode: 401,
				message: "Wrong user email and/or password.",
			})
		}
	} else {
		res.status(400).json({
			ok: false,
			status: "Bad request",
			statusCode: 400,
			...errors,
		})
	}

	//TODO: add check for already logged in user.
}

const signUp = async (req, res, next) => {
	const errors = validationResult(req)

	if (errors.isEmpty()) {
		const hashedPassword = await bcrypt.hash(req.body.password, 8)
		const isExsiting = await req.dbServices.userServices.getByEmail(req.body.email)

		if (isExsiting === null) {
			const newUser = {
				email: req.body.email,
				nameAndSurname: req.body.nameAndSurname,
				hashedPassword,
				profileImg: "",
				listings: [],
				reviews: [],
				conversations: [],
				premiumPlan: 0,
				phone: null,
				address: null,
				website: null,
				skills: [],
				diplomasAndCertifs: [],
				rating: 0,
				about: "",
			}

			await req.dbServices.userServices.createNew(newUser)

			next()
		} else {
			res.status(409).json({
				ok: false,
				status: "Conflict",
				statusCode: 409,
				message: "Existing user. Please sign in.",
			})
		}
	} else {
		res.status(400).json({
			ok: false,
			status: "Bad request",
			statusCode: 400,
			message: errors.join("\n"),
		})
	}
}

router.post(
	"/sign-in",
	body("email").isEmail().withMessage("Must be a valid Email"),
	signIn,
)

router.post(
	"/sign-up",
	body("nameAndSurname").isLength({ min: 1 }).withMessage("Names are required"),
	body("email").isEmail().withMessage("Not a valid email!"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 symbols!")
		.custom((value, { req }) => req.customValidators.doPasswordsMatch(value, req))
		.withMessage("Passwords do not match!"),
	signUp,
	signIn,
)

router.get("/:id/messages", async (req, res) => {
	const userId = req.params.id
	const dbService = req => req.dbServices.userServices.getAllUserMessages(userId)

	await abstractGetRequest(req, res, dbService)
})
router.get("/message/:id", async (req, res) => {
	const messageId = req.params.id
	const dbService = req => req.dbServices.userServices.getSingleMessage(messageId)

	await abstractGetRequest(req, res, dbService)
})
router.get("/profile/:id", async (req, res) => {
	const userId = req.params.id
	const dbService = req => req.dbServices.userServices.getUserForProfile(userId)

	await abstractGetRequest(req, res, dbService)
})

router.put('/edit/:id',
	processFormData,
	body("nameAndSurname")
		.isLength({ min: 6 })
		.withMessage('Names must be at least 6 characters long!'),
	body("phone")
		.custom((value, { req }) => req.customValidators.phoneValidator(value, req))
		.withMessage("Invalid phone."),
	body("website")
		.custom((value, { req }) => req.customValidators.websiteValidator(value, req))
		.withMessage("Invalid website."),
	body("email")
		.isEmail()
		.withMessage("Invalid email."),
	body("address")
		.custom((value, { req }) => req.customValidators.addressValidator(value, req))
		.withMessage("Invalid address."),
	body("password")
		.custom((value, { req }) => req.customValidators.editPasswordValidator(value, req))
		.withMessage("Password must be at least 6 symbols!")
		.custom((value, { req }) => req.customValidators.doPasswordsMatch(value, req))
		.withMessage("Passwords do not match!"),
	body("about")
		.isLength({ min: 1 })
		.withMessage('About section must not be empty!'),
	async (req, res) => {
		const errors = validationResult(req)
		let image = ''

		if (errors.isEmpty()) {
			const profileImg = req.files.profileImg
			let token

			try {
				if (profileImg) {
					const [responseData] = await uploadImages([profileImg])
					image = responseData.Location
				}

				const user = await req.dbServices.userServices.getById(req.user._id)
				const skills = JSON.parse(req.body.skills)

				const newUserData = {
					email: req.body.email || user.email,
					nameAndSurname: req.body.nameAndSurname || user.nameAndSurname,
					profileImg: image,
					listings: user.listings,
					reviews: user.reviews,
					rating: user.rating,
					conversations: user.conversations,
					premiumPlan: user.premiumPlan,
					about: req.body.about || user.about,
					phone: req.body.phone || user.phone,
					address: req.body.address || user.address,
					website: req.body.website || user.website,
					skills: skills || user.skills,
					diplomasAndCertifs: req.body.diplomasAndCertifs || user.diplomasAndCertifs,
				}

				if (req.body.password !== '') {
					newUserData.hashedPassword = await bcrypt.hash(req.body.password, 8)
				}

				token = createJWTToken({ _id: user._id, ...newUserData })
				attachCookie(token, res)

				const data = await req.dbServices.userServices.updateById(req.user._id, newUserData)

				console.log(data)

				res.json({ ok: true, status: 'Ok', statusCode: 200, data, token })
			} catch (e) {
				console.log(e)
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

router.get("/search", async (req, res) => {
	const criteria = req.query.search
	const dbService = req => req.dbServices.userServices.searchUsers(criteria)

	await abstractGetRequest(req, res, dbService)
})

router.post("/send-message/:id", async (req, res) => {
	const receiverId = req.params.id
	const userId = req.user._id
	const msg = req.body.message

	if (userId === receiverId) {
		res.status(403).json({ status: "Forbidden", statusCode: 403, msg: "Invalid message recipient" })
	}

	try {
		const conversation = await req.dbServices.userServices.checkExistingConversation([userId, receiverId])

		if (conversation) {
			const newMsg = {
				sender: userId,
				text: msg,
			}
			conversation.messages.push(newMsg)

			await conversation.save()

			res.json({ ok: true, status: "ok", statusCode: 200, data: conversation })
		} else {
			const [user, receiver] = await Promise.all([
				req.dbServices.userServices.getById(userId),
				req.dbServices.userServices.getById(receiverId),
			])

			const data = {
				messages: [{
					sender: userId,
					text: msg,
				}],
				participants: [userId, receiverId],
				user: userId,
			}

			const newConversation = await req.dbServices.userServices.createNewConversation(data)

			user.conversations.push(newConversation._id)
			receiver.conversations.push(newConversation._id)

			await Promise.all([user.save(), receiver.save()])

			res.json({ ok: true, status: "ok", statusCode: 200, data: newConversation })
		}
	} catch (e) {
		res.status(400).json({ status: "Bad request", statusCode: 400, ok: false, msg: e })
	}
})

router.post("/:id/add-review", async (req, res) => {
	const dbService = async (req) => {
		console.log(req.params)

		const data = {
			text: req.body.reviewText || '',
			rating: Number(req.body.reviewRating),
			user: req.params.id,
			reviewCreator: req.user._id,
		}

		const [newReview, user] = await Promise.all([
			req.dbServices.userServices.createNewReview(data),
			req.dbServices.userServices.getById(req.params.id),
		])

		user.reviews.push(newReview._id)
		user.rating = Number(user.rating) + Number(newReview.rating)
		
		await user.save()

		const listing = await req.dbServices.listingsServices.getListingWithUserReviews(req.query.listingId)

		return listing
	}

	await abstractGetRequest(req, res, dbService)
})

module.exports = router
