const jwt = require("jsonwebtoken")
const { createJWTToken } = require("../helpers/createJWTToken.js")

const processAuth = async (req, res, next) => {
	const cookieName = process.env.COOKIE_NAME
	const token = req.cookies[cookieName]

	if (token) {
		try {
			let userData = jwt.verify(token, process.env.TOKEN_SECRET)

			const user = await req.dbServices.userServices.getById(userData._id)

			const updatedUserData = Object.entries(userData).reduce((a, v) => {
				a[v[0]] = user[v[0]] || v[1]

				return a
			}, {})

			req.newToken = createJWTToken(updatedUserData)
			req.user = updatedUserData
		} catch (e) {

			res.clearCookie(cookieName)
			res.json({
				ok: false,
				status: 401,
				statsText: 'Unauthorized',
				msg: "Invalid or expired user. Please sign in again.",
			})

			return false
		}
	}
	next()
}

module.exports = processAuth


