const jwt = require("jsonwebtoken")

const processAuth = (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME
    const token = req.cookies[cookieName]

    console.log(token)
    console.log(process.env.COOKIE_NAME)
    console.log(req.cookies)
    console.log(process.env.TOKEN_SECRET)

    if (token) {
        try {
            const userData = jwt.verify(token, process.env.TOKEN_SECRET)

            console.log("entered try catch")
            console.log(userData)

            req.user = userData
        } catch (e) {
            console.log("errror")
            console.log(e)

            res.clearCookie(cookieName)
            res.status(401).json({ ok: false, message: "Unauthorized" })

            return false
        }
    }

    console.log("will call next")
    next()
}

module.exports = processAuth
