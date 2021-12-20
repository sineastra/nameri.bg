const abstractGetRequest = async (req, res, dbService, errorObj = {}) => {
	const count = Number(req.query.count) || 0

	try {
		const data = await dbService(req, count)

		res.status(200).json({ ok: true, statusText: "ok", status: 200, data })
	} catch (e) {
		res.json({
			ok: false,
			statusText: errorObj.status || "Not Found",
			status: errorObj.statusCode || 404,
			message: e.message || "Something went wrong, please try again.",
		})
	}
}

module.exports = { abstractGetRequest }
