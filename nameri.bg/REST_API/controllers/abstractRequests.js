const abstractGetRequest = async (req, res, dbService, errorObj = {}) => {
	const count = Number(req.query.count) || 0

	try {
		const data = await dbService(req, count)

		res.status(200).json({ ok: true, status: "ok", statusCode: 200, data })
	} catch (e) {
		res.json({
			ok: false,
			status: errorObj.status || "Not Found",
			statusCode: errorObj.statusCode || 404,
			message: e.message || "Something went wrong, please try again.",
		})
	}
}

module.exports = { abstractGetRequest }
