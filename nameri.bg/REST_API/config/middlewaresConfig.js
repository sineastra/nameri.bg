const processAuth = require("../middlewares/processAuth")
const dbServices = require("../middlewares/dbServices")

// custom middlewares created by me for use in the app. descriptions in the Middleware files themselves.

const middlewaresConfig = app => {
    app.use(processAuth)
    app.use(dbServices)
}

module.exports = middlewaresConfig
