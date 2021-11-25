const User = require("../db/models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = require("express").Router()
const { body, validationResult } = require("express-validator")

const login = async (req, res) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        const user = await req.dbServices.user.getByEmail(req.body.email)

        if (user && (await bcrypt.compare(req.body.password, user.hashedPassword))) {
            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    nickname: user.nickname,
                },
                process.env.TOKEN_SECRET
            )

            const cookie = res.cookie(process.env.COOKIE_NAME, token, {
                sameSite: "none",
                secure: true,
            })

            console.log(cookie)
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
}

const register = async (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8)
        const isExsiting = await req.dbServices.user.getByEmail(req.body.email)

        if (isExsiting === null) {
            const newUser = {
                nickname: req.body.nickname,
                email: req.body.email,
                hashedPassword,
                nickname: req.body.nickname,
                wishlist: [],
                reviews: [],
                purchases: [],
                profilePicture: "",
                coverPicture: "",
            }

            await req.dbServices.user.createNew(newUser)

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

router.get("/login", login)
router.get("/register", register)

module.exports = router
