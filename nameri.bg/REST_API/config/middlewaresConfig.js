const processAuth = require("../middlewares/processAuth")
const dbServices = require("../middlewares/dbServices")
const customValidators = require("../middlewares/customValidators")
const processFormData = require("../middlewares/processFormData.js")

// custom middlewares created by me for use in the app. descriptions in the Middleware files themselves.

const middlewaresConfig = app => {
	app.use(processAuth)
	app.use(dbServices)
	app.use(customValidators)
}

module.exports = middlewaresConfig
