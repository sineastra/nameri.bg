const { IncomingForm } = require("formidable")

const processFormData = async (req, res, next) => {
	const formData = new IncomingForm({ multiples: true })

	const parseAndFillData = new Promise((res, rej) => {
		formData.parse(req, (err, fields, files) => {
			try {
				req.body = fields
				req.files = files

				res()
			} catch (e) {
				rej(e)
			}
		})
	})

	const parseResult = await parseAndFillData

	next()
}

module.exports = processFormData