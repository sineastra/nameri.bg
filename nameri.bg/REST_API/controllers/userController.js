const bcrypt = require("bcrypt")
const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const { abstractGetRequest } = require("./abstractRequests")
const uploadImages = require("../helpers/uploadFilesS3.js")
const { createJWTToken, attachCookie } = require("../helpers/createJWTToken.js")
const processFormData = require("../middlewares/processFormData.js")
const { validateRegister, validateLogin, validateProfileEdit } = require("../middlewares/formsValidators.js")

const signIn = async (req, res) => {
	const errors = validationResult(req)

	if (errors.isEmpty()) {
		const user = await req.dbServices.userServices.getByEmail(req.body.email)

		if (user && (await bcrypt.compare(req.body.password, user.hashedPassword))) {
			const token = createJWTToken(user)

			attachCookie(token, res)

			res.json({ ok: true, status: 200, statusCode: "OK", token })
		} else {
			res.json({
				ok: false,
				status: "Unauthorized",
				statusCode: 401,
				errors: [{ msg: "Wrong user email and/or password." }],
			})
		}
	} else {
		res.json({
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
				errors: [{ msg: "Existing user. Please sign in." }],
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
}

router.post("/sign-in", validateLogin(), signIn)

router.post("/sign-up", validateRegister(), signUp, signIn)

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
	validateProfileEdit,
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

const addMsg = async (req, res) => {
	const receiverId = req.params.id
	const userId = req.user._id
	const msg = req.body.message

	if (userId === receiverId) {
		res.status(403).json({ status: "Forbidden", statusCode: 403, msg: "Invalid message recipient" })
	}

	if (msg === '') {
		res.json({ status: "Bad Request", statusCode: 400, errors: [{ msg: "Message cannot be empty." }] })
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
			const conversations = await req.dbServices.userServices.getAllUserMessages(userId)

			res.json({ ok: true, status: "ok", statusCode: 200, data: conversations })
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

			res.json({
					ok: true,
					status: "ok",
					statusCode: 200,
					data: user.conversations,
				},
			)
		}
	} catch (e) {
		res.status(400).json({ status: "Bad request", statusCode: 400, ok: false, msg: e })
	}

}

router.post("/send-message/:id", addMsg)

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

router.get("/is-own-listing/:id", async (req, res) => {
	console.log('here')
	const dbService = async (req) => {
		const user = await req.dbServices.userServices.getById(req.user._id)

		const isOwn = user.listings.some(x => x === req.params.id)

		console.log(isOwn)
		console.log(user.listings)
		console.log(req.params.id)

		return isOwn
	}

	await abstractGetRequest(req, res, dbService)
})

router.get("/logout", (req, res) => {
	res.clearCookie(process.env.COOKIE_NAME)
	console.log(res.cookies)
	res.json({ ok: true })
})

module.exports = router
