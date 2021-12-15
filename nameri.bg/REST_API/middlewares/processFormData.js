const { IncomingForm } = require("formidable")

const processFormData = async (req, res, next) => {
	const formData = new IncomingForm()
	const parseAndFillData = new Promise((res, rej) => {
		formData.parse(req, (err, fields, files) => {
			try {
				if (Object.keys(fields).length !== 0 && Object.keys(files).length !== 0) {
					req.body = fields
					req.files = files
				}

				res()
			} catch (e) {
				rej(e)
			}
		})
	})

	await parseAndFillData

	next()
}

module.exports = processFormData