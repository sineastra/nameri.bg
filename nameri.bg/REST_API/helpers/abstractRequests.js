const abstractDBRequest = async (req, res, dbService, errorObj = {}) => {
	try {
		const data = await dbService(req)

		res.json({ ok: true, statusText: "ok", status: 200, data, token: req.newToken })
	} catch (e) {
		res.json({
			ok: false,
			statusText: errorObj.status || "Not Found",
			status: errorObj.statusCode || 404,
			msg: e.message || "Something went wrong, please try again.",
		})
	}
}

module.exports = { abstractDBRequest }
