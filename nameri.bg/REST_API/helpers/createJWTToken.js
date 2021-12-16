const jwt = require("jsonwebtoken")

const createJWTToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			email: user.email,
			nameAndSurname: user.nameAndSurname,
		},
		process.env.TOKEN_SECRET,
	)
}

const attachCookie = (token, res) => {
	return res.cookie(process.env.COOKIE_NAME, token, {
		sameSite: "none",
		secure: true,
	})
}

module.exports = { createJWTToken, attachCookie }