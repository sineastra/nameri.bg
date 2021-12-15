const jwt = require("jsonwebtoken")

const processAuth = (req, res, next) => {
	const cookieName = process.env.COOKIE_NAME
	const token = req.cookies[cookieName]

	if (token) {
		try {
			const userData = jwt.verify(token, process.env.TOKEN_SECRET)

			req.user = userData
		} catch (e) {

			res.clearCookie(cookieName)
			res.status(401).json({ ok: false, message: "Unauthorized" })

			return false
		}
	}
	next()
}

module.exports = processAuth


