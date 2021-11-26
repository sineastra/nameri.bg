const jwt = require("jsonwebtoken")

const processAuth = (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME
    const token = req.cookies[cookieName]

    console.log(token)

    if (token) {
        try {
            const userData = jwt.verify(token, process.env.TOKEN_SECRET)

            console.log(userData)

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
