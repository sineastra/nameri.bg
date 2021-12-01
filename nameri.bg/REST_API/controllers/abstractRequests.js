const abstractGetRequest = async (req, res, dbService) => {
    const count = Number(req.query.count) || 0

    try {
        const data = await dbService(req, count)

        console.log(data)

        res.status(200).json({ ok: true, status: "ok", statusCode: 200, data })
    } catch (e) {
        res.json({
            ok: false,
            status: e.status || "Not Found",
            statusCode: e.statusCode || 404,
            message: e.message || "Something went wrong, please try again.",
        })
    }
}

module.exports = { abstractGetRequest }
